using System;
using System.Collections.Generic;

#nullable disable

namespace NPL.Models
{
    public partial class Client
    {
        public Client()
        {
            JobOffers = new HashSet<JobOffer>();
        }

        public Guid ClientId { get; set; }
        public string CompanyName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual ICollection<JobOffer> JobOffers { get; set; }
    }
}
