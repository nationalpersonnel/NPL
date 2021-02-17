using System;
using System.Collections.Generic;
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
    public class WorkerTypesController : ControllerBase
    {
        private readonly NPLContext _context;

        public WorkerTypesController(NPLContext context)
        {
            _context = context;
        }

        // GET: api/WorkerTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkerType>>> GetWorkerTypes()
        {
            return await _context.WorkerTypes.ToListAsync();
        }

        // GET: api/WorkerTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkerType>> GetWorkerType(Guid id)
        {
            var workerType = await _context.WorkerTypes.FindAsync(id);

            if (workerType == null)
            {
                return NotFound();
            }

            return workerType;
        }

        // PUT: api/WorkerTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkerType(Guid id, WorkerType workerType)
        {
            if (id != workerType.WorkerTypeId)
            {
                return BadRequest();
            }

            _context.Entry(workerType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkerTypeExists(id))
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

        // POST: api/WorkerTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WorkerType>> PostWorkerType(WorkerType workerType)
        {
            _context.WorkerTypes.Add(workerType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWorkerType", new { id = workerType.WorkerTypeId }, workerType);
        }

        // DELETE: api/WorkerTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkerType(Guid id)
        {
            var workerType = await _context.WorkerTypes.FindAsync(id);
            if (workerType == null)
            {
                return NotFound();
            }

            _context.WorkerTypes.Remove(workerType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WorkerTypeExists(Guid id)
        {
            return _context.WorkerTypes.Any(e => e.WorkerTypeId == id);
        }
    }
}
