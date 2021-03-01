using System;
using System.Collections.Generic;

#nullable disable

namespace NPL.Models
{
    public partial class Branch
    {
        public Guid BranchId { get; set; }
        public string Name { get; set; }
        public string Division { get; set; }
    }
}
