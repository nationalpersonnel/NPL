using System;
using System.Collections.Generic;

#nullable disable

namespace NPL.Models
{
    public partial class ApprovedToWork
    {
        public Guid ApprovedToWorkId { get; set; }
        public Guid WorkerId { get; set; }
        public bool? HasCompetency { get; set; }
        public bool? IsIrdsigned { get; set; }
        public bool? HasRightToWork { get; set; }
        public bool? IsIdapproved { get; set; }
        public bool? IsContractSigned { get; set; }

        public virtual Worker Worker { get; set; }
    }
}
