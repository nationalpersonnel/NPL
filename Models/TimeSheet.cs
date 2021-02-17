using System;
using System.Collections.Generic;

#nullable disable

namespace NPL.Models
{
    public partial class TimeSheet
    {
        public Guid TimeSheetId { get; set; }
        public Guid WorkerId { get; set; }
        public bool? Approved { get; set; }
        public DateTime WeekEndDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public bool? IsLunchPaid { get; set; }
        public bool? IsTraining { get; set; }
        public bool? IsPublicHoliday { get; set; }

        public virtual Worker Worker { get; set; }
    }
}
