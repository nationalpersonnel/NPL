using System;
using System.Collections.Generic;

#nullable disable

namespace NPL.Models
{
    public partial class Recruiter
    {
        public Recruiter()
        {
            JobOffers = new HashSet<JobOffer>();
            Workers = new HashSet<Worker>();
        }

        public Guid RecruiterId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual ICollection<JobOffer> JobOffers { get; set; }
        public virtual ICollection<Worker> Workers { get; set; }
    }
}
