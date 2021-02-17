using System;
using System.Collections.Generic;

#nullable disable

namespace NPL.Models
{
    public partial class WorkerType
    {
        public WorkerType()
        {
            Workers = new HashSet<Worker>();
        }

        public Guid WorkerTypeId { get; set; }
        public string Type { get; set; }

        public virtual ICollection<Worker> Workers { get; set; }
    }
}
