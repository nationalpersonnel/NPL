using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NPL.Models;

namespace NPL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkersController : ControllerBase
    {
        private readonly NPLContext _context;

        public WorkersController(NPLContext context)
        {
            _context = context;
        }

        // GET: api/Workers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Worker>>> GetWorkers()
        {

            List<Worker> wrks = new List<Worker>();
            foreach (Worker wr in _context.Workers)
            {
                Worker wrk = new Worker();
                wrk.WorkerId = wr.WorkerId;
                wrk.FirstName = wr.FirstName;
                wrk.LastName = wr.LastName;
                wrk.Dob = wr.Dob;
                wrk.Email = wr.Email;
                wrk.StartDate = wr.StartDate;
                foreach(WorkerType workertypes in _context.WorkerTypes)
                {
                    if(wr.WorkerTypeId == workertypes.WorkerTypeId)
                    {
                        wrk.WorkerType = workertypes;
                    }
                }
                foreach (Branch b in _context.Branches)
                {
                    if (wr.BranchId == b.BranchId)
                    {
                        wrk.Branch = b;
                    }
                }
                foreach (Recruiter r in _context.Recruiters)
                {
                    if (wr.RecruiterId == r.RecruiterId)
                    {
                        wrk.Recruiter = r;
                    }
                }
                wrk.Ethnicity = wr.Ethnicity;
                wrk.SickLeavesLeft = wr.SickLeavesLeft;
                wrks.Add(wrk);
            }

            return await Task.FromResult(wrks.ToList());
        }

        // GET: api/Workers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Worker>> GetWorker(Guid id)
        {
            var worker = await _context.Workers.FindAsync(id);

            if (worker == null)
            {
                return NotFound();
            }

            return worker;
        }

        // PUT: api/Workers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorker(Guid id, Worker worker)
        {
            if (id != worker.WorkerId)
            {
                return BadRequest();
            }

            _context.Entry(worker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Workers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Worker>> PostWorker(Worker worker)
        {

            worker.WorkerId = Guid.NewGuid();
            _context.Workers.Add(worker);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWorker", new { id = worker.WorkerId }, worker);
        }

        // DELETE: api/Workers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorker(Guid id)
        {
            var worker = await _context.Workers.FindAsync(id);
            if (worker == null)
            {
                return NotFound();
            }

            _context.Workers.Remove(worker);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WorkerExists(Guid id)
        {
            return _context.Workers.Any(e => e.WorkerId == id);
        }
    }
}
