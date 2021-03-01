using System;
using System.Collections.Generic;

#nullable disable

namespace NPL.Models
{
    public partial class Tax
    {
        public Guid TaxId { get; set; }
        public string Irdnumber { get; set; }
        public string TaxCode { get; set; }
        public string KiwiSaver { get; set; }
        public string Leaves { get; set; }
    }
}
