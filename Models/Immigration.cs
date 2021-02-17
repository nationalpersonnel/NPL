using System;
using System.Collections.Generic;

#nullable disable

namespace NPL.Models
{
    public partial class Immigration
    {
        public Guid ImmigrationId { get; set; }
        public Guid WorkerId { get; set; }
        public string VisaType { get; set; }
        public DateTime VisaExpiryDate { get; set; }

        public virtual Worker Worker { get; set; }
    }
}
