﻿using System;
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
    public class RecruitersController : ControllerBase
    {
        private readonly NPLContext _context;

        public RecruitersController(NPLContext context)
        {
            _context = context;
        }

        // GET: api/Recruiters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recruiter>>> GetRecruiters()
        {
            return await _context.Recruiters.ToListAsync();
        }

        // GET: api/Recruiters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recruiter>> GetRecruiter(Guid id)
        {
            var recruiter = await _context.Recruiters.FindAsync(id);

            if (recruiter == null)
            {
                return NotFound();
            }

            return recruiter;
        }

        // PUT: api/Recruiters/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecruiter(Guid id, Recruiter recruiter)
        {
            if (id != recruiter.RecruiterId)
            {
                return BadRequest();
            }

            _context.Entry(recruiter).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecruiterExists(id))
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

        // POST: api/Recruiters
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Recruiter>> PostRecruiter(Recruiter recruiter)
        {
            _context.Recruiters.Add(recruiter);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecruiter", new { id = recruiter.RecruiterId }, recruiter);
        }

        // DELETE: api/Recruiters/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecruiter(Guid id)
        {
            var recruiter = await _context.Recruiters.FindAsync(id);
            if (recruiter == null)
            {
                return NotFound();
            }

            _context.Recruiters.Remove(recruiter);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecruiterExists(Guid id)
        {
            return _context.Recruiters.Any(e => e.RecruiterId == id);
        }
    }
}
