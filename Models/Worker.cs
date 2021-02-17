using System;
using System.Collections.Generic;

#nullable disable

namespace NPL.Models
{
    public partial class Worker
    {
        public Worker()
        {
            ApprovedToWorks = new HashSet<ApprovedToWork>();
            Immigrations = new HashSet<Immigration>();
            JobOffers = new HashSet<JobOffer>();
            TimeSheets = new HashSet<TimeSheet>();
        }

        public Guid WorkerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Dob { get; set; }
        public string Email { get; set; }
        public DateTime StartDate { get; set; }
        public Guid WorkerTypeId { get; set; }
        public Guid RecruiterId { get; set; }
        public Guid BranchId { get; set; }
        public string Ethnicity { get; set; }
        public int? SickLeavesLeft { get; set; }

        public virtual Branch Branch { get; set; }
        public virtual Recruiter Recruiter { get; set; }
        public virtual WorkerType WorkerType { get; set; }
        public virtual ICollection<ApprovedToWork> ApprovedToWorks { get; set; }
        public virtual ICollection<Immigration> Immigrations { get; set; }
        public virtual ICollection<JobOffer> JobOffers { get; set; }
        public virtual ICollection<TimeSheet> TimeSheets { get; set; }
    }
}
