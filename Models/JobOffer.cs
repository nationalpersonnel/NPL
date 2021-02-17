using System;
using System.Collections.Generic;

#nullable disable

namespace NPL.Models
{
    public partial class JobOffer
    {
        public Guid JobOfferId { get; set; }
        public Guid WorkerId { get; set; }
        public Guid ClientId { get; set; }
        public Guid RecruiterId { get; set; }
        public decimal? PayRate { get; set; }
        public decimal? ChargeRate { get; set; }
        public bool? IsChargeRateApproved { get; set; }
        public string Location { get; set; }
        public DateTime? StartDate { get; set; }

        public virtual Client Client { get; set; }
        public virtual Recruiter Recruiter { get; set; }
        public virtual Worker Worker { get; set; }
    }
}
