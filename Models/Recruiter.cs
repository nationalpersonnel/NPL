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
        }

        public Guid RecruiterId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual ICollection<JobOffer> JobOffers { get; set; }
    }
}
