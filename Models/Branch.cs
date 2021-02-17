using System;
using System.Collections.Generic;

#nullable disable

namespace NPL.Models
{
    public partial class Branch
    {
        public Branch()
        {
            Workers = new HashSet<Worker>();
        }

        public Guid BranchId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Worker> Workers { get; set; }
    }
}
