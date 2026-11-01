'use strict';

/**
 * Seed listings for a WorkIndia-style blue-collar job portal.
 * Every role is a real Indian entry-level / blue-collar job with a monthly
 * salary band, a locality-level location, a city, an experience band and a
 * minimum qualification — the details candidates actually decide on.
 */
function daysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

module.exports = function seedJobs() {
  return [
    {
      id: 1,
      title: 'Delivery Executive',
      company: 'Blinkit',
      location: 'Andheri East, Mumbai',
      city: 'Mumbai',
      workMode: 'On-site',
      category: 'Delivery',
      type: 'Full-time',
      experience: 'Fresher',
      qualification: '10th Pass',
      salaryMin: 18000,
      salaryMax: 25000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Deliver grocery orders to customers in your assigned area within the promised 10-minute window. You will get a fixed monthly salary plus daily incentives for completed orders.',
      responsibilities: [
        'Pick up packed orders from the dark store and deliver them to customers',
        'Follow the app route and update delivery status on time',
        'Handle cash-on-delivery orders and deposit the amount at the end of the shift',
        'Keep the delivery bag and bike clean and in working condition'
      ],
      requirements: [
        'Own a two-wheeler with valid licence and RC',
        'Basic smartphone with internet connection',
        'Aadhaar card and PAN card',
        'Willingness to work in rotational shifts'
      ],
      skills: ['Two-wheeler', 'Smartphone', 'Route Knowledge', 'Local Area'],
      postedAt: daysAgo(0),
      contactEmail: 'hiring@blinkit.example',
      status: 'published'
    },
    {
      id: 2,
      title: 'Bike Rider / Delivery Boy',
      company: 'Swiggy',
      location: 'Koramangala, Bengaluru',
      city: 'Bengaluru',
      workMode: 'On-site',
      category: 'Delivery',
      type: 'Part-time',
      experience: 'Fresher',
      qualification: 'Below 10th Pass',
      salaryMin: 20000,
      salaryMax: 28000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Earn a steady monthly payout delivering food orders in Koramangala and Indiranagar. Choose morning or evening shifts and get weekly incentives on top of your fixed pay.',
      responsibilities: [
        'Accept food orders from restaurants and deliver them hot and on time',
        'Manage multiple orders in one route during peak hours',
        'Maintain a good rating by being polite to customers',
        'Report any bike or app issue to the zone manager immediately'
      ],
      requirements: [
        'Two-wheeler and valid driving licence',
        'Android smartphone with GPS',
        'Comfortable riding in traffic for 6 to 8 hours a day'
      ],
      skills: ['Two-wheeler', 'GPS Navigation', 'Customer Handling'],
      postedAt: daysAgo(1),
      contactEmail: 'riders@swiggy.example',
      status: 'published'
    },
    {
      id: 3,
      title: 'Cab Driver',
      company: 'Rapido Cabs',
      location: 'Thane East, Thane',
      city: 'Thane',
      workMode: 'On-site',
      category: 'Driver',
      type: 'Full-time',
      experience: '1 - 2 years',
      qualification: '10th Pass',
      salaryMin: 25000,
      salaryMax: 32000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Drive company-owned cabs on city trips. You get a fixed monthly salary, fuel allowance and a night allowance on late shifts. Ownership of the vehicle is not required.',
      responsibilities: [
        'Drive customers safely to their destination on the assigned route',
        'Keep the cab clean and the fuel level checked before each shift',
        'Use the driver app for trip start, trip end and payment',
        'Follow traffic rules and maintain a 4.8+ rating'
      ],
      requirements: [
        'Valid LMV commercial driving licence with badge',
        'At least 1 year of city driving experience',
        'Knows Mumbai and Thane road network',
        'Police verification is mandatory'
      ],
      skills: ['Driving', 'City Routes', 'Customer Service'],
      postedAt: daysAgo(1),
      contactEmail: 'driver.hiring@rapido.example',
      status: 'published'
    },
    {
      id: 4,
      title: 'Heavy Truck Driver',
      company: 'Nirmaan Logistics',
      location: 'Bhiwandi, Thane',
      city: 'Thane',
      workMode: 'On-site',
      category: 'Driver',
      type: 'Full-time',
      experience: '2+ years',
      qualification: 'Below 10th Pass',
      salaryMin: 28000,
      salaryMax: 36000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Drive long-haul 20 to 32 feet trucks between our Bhiwandi warehouse and Gujarat warehouse. Food allowance and trip allowance are paid over and above the monthly salary.',
      responsibilities: [
        'Load, secure and deliver consignment on the assigned route',
        'Check tyres, oil and brakes before every trip',
        'Submit toll and diesel bills with the trip sheet',
        'Report delays or breakdowns to the transport desk'
      ],
      requirements: [
        'Valid HMV driving licence with 2+ years of highway experience',
        'Ability to handle 8 to 12 day trips',
        'Basic reading of loading documents and e-way bills'
      ],
      skills: ['HMV Licence', 'Highway Driving', 'Vehicle Inspection'],
      postedAt: daysAgo(2),
      contactEmail: 'transport@nirmaan.example',
      status: 'published'
    },
    {
      id: 5,
      title: 'Security Guard',
      company: 'Anaya Enterprises',
      location: 'Bandra West, Mumbai',
      city: 'Mumbai',
      workMode: 'On-site',
      category: 'Security Guard',
      type: 'Full-time',
      experience: 'Fresher',
      qualification: 'Below 10th Pass',
      salaryMin: 16000,
      salaryMax: 20000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Guard the main gate of a residential society in Bandra. Night shift is available with an extra allowance, and uniforms plus PF/ESIC are provided by the company.',
      responsibilities: [
        'Check visitor entries and register them in the gate logbook',
        'Patrol the premises once every two hours during the shift',
        'Open and close the gate for residents and delivery staff',
        'Report any suspicious activity to the supervisor immediately'
      ],
      requirements: [
        'Age between 20 and 45 years',
        'Aadhaar card and a clean police verification',
        'Able to stand for long hours',
        'No English required — Hindi or Marathi is enough'
      ],
      skills: ['Gate Duty', 'Visitor Entry', 'Vigilance'],
      postedAt: daysAgo(2),
      contactEmail: 'hr@anayaenterprises.example',
      status: 'published'
    },
    {
      id: 6,
      title: 'Security Supervisor',
      company: 'Paramount Protection Services',
      location: 'Malad West, Mumbai',
      city: 'Mumbai',
      workMode: 'On-site',
      category: 'Security Guard',
      type: 'Full-time',
      experience: '2+ years',
      qualification: '10th Pass',
      salaryMin: 22000,
      salaryMax: 28000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Supervise a team of eight guards across two office towers in Malad. You will handle shift rosters, attendance and daily security reporting for the client.',
      responsibilities: [
        'Prepare the weekly duty roster for the guard team',
        'Verify attendance and replacement cover for absent guards',
        'Conduct night patrols and submit the daily security report',
        'Train new guards on visitor entry and emergency procedures'
      ],
      requirements: [
        '2+ years as a security guard or supervisor',
        'Able to read and write basic reports in English or Hindi',
        'Ex-servicemen preferred',
        'Own a smartphone for attendance and reporting'
      ],
      skills: ['Team Supervision', 'Roster Planning', 'Security Reporting'],
      postedAt: daysAgo(3),
      contactEmail: 'careers@paramountprotection.example',
      status: 'published'
    },
    {
      id: 7,
      title: 'House Maid (Full Day)',
      company: 'Sharma Household',
      location: 'Borivali East, Mumbai',
      city: 'Mumbai',
      workMode: 'On-site',
      category: 'Housekeeping',
      type: 'Full-time',
      experience: '1 - 2 years',
      qualification: 'Below 10th Pass',
      salaryMin: 12000,
      salaryMax: 15000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Full-day house maid needed for a family of four in Borivali East. Work includes cleaning, washing utensils and light kitchen help. Sunday off and one festival bonus every year.',
      responsibilities: [
        'Sweep, mop and clean all rooms every day',
        'Wash utensils after breakfast, lunch and dinner',
        'Do the laundry and keep the cupboard organised',
        'Support the family with light cooking when required'
      ],
      requirements: [
        '1+ year of household cleaning experience',
        'Comfortable living within 5 km of Borivali East',
        'Female candidates preferred',
        'No English required'
      ],
      skills: ['Cleaning', 'Kitchen Help', 'Laundry'],
      postedAt: daysAgo(3),
      contactEmail: 'sharma.family.example@gmail.example',
      status: 'published'
    },
    {
      id: 8,
      title: 'Housekeeping Staff (Office)',
      company: 'Cleanway Facility Services',
      location: 'Nehru Place, Delhi NCR',
      city: 'Delhi NCR',
      workMode: 'On-site',
      category: 'Housekeeping',
      type: 'Full-time',
      experience: 'Fresher',
      qualification: 'Below 10th Pass',
      salaryMin: 13000,
      salaryMax: 17000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Keep the office floors, washrooms and pantry clean in a corporate building in Nehru Place. Day shift only, uniform and PF provided from day one.',
      responsibilities: [
        'Clean floors, workstations, washrooms and pantry areas',
        'Refill soap, tissue and drinking water stations',
        'Collect waste from desks and dispose of it at the collection point',
        'Immediately report any bathroom or machine leakage'
      ],
      requirements: [
        'No prior experience required — training is provided',
        'Aadhaar card required for building access',
        'Comfortable with day shift starting at 8 AM'
      ],
      skills: ['Cleaning', 'Waste Management', 'Office Etiquette'],
      postedAt: daysAgo(4),
      contactEmail: 'hr@cleanway.example',
      status: 'published'
    },
    {
      id: 9,
      title: 'Cook (North Indian)',
      company: 'Hotel Surya Grand',
      location: 'Karol Bagh, Delhi NCR',
      city: 'Delhi NCR',
      workMode: 'On-site',
      category: 'Cook / Chef',
      type: 'Full-time',
      experience: '2+ years',
      qualification: 'Below 10th Pass',
      salaryMin: 22000,
      salaryMax: 30000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Cook North Indian breakfast and main course dishes for our hotel kitchen, serving 200 covers a day. Free staff meals and shared accommodation are available.',
      responsibilities: [
        'Prepare gravies, dal, roti and tandoor items as per the menu',
        'Maintain recipe portion control and avoid wastage',
        'Keep the cooking station and utensils clean after every shift',
        'Support the head chef during banquet events'
      ],
      requirements: [
        '2+ years of cooking North Indian cuisine in a hotel or restaurant',
        'Knowledge of portion control and kitchen hygiene',
        'Able to work split shifts and weekends'
      ],
      skills: ['North Indian Cooking', 'Tandoor', 'Kitchen Hygiene'],
      postedAt: daysAgo(4),
      contactEmail: 'chef@hotelsuryagrand.example',
      status: 'published'
    },
    {
      id: 10,
      title: 'Commis Chef / Kitchen Helper',
      company: 'Spice Route Kitchen',
      location: 'Koregaon Park, Pune',
      city: 'Pune',
      workMode: 'On-site',
      category: 'Cook / Chef',
      type: 'Full-time',
      experience: 'Fresher',
      qualification: '10th Pass',
      salaryMin: 14000,
      salaryMax: 18000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Support the kitchen team with chopping, prepping and plating during service hours. Ideal first kitchen job for someone who wants to learn cooking professionally.',
      responsibilities: [
        'Wash, chop and portion vegetables before service',
        'Assist the commis chef during plating and dispatch',
        'Clean the kitchen counters and keep the prep area dry',
        'Label and store ingredients as instructed'
      ],
      requirements: [
        'Willingness to learn — no cooking experience required',
        'Able to stand for 8 hours with a one-hour break',
        'Comfortable with a 10 AM to 10 PM shift, 6 days a week'
      ],
      skills: ['Food Prep', 'Kitchen Hygiene', 'Team Work'],
      postedAt: daysAgo(5),
      contactEmail: 'kitchen@spiceroute.example',
      status: 'published'
    },
    {
      id: 11,
      title: 'Electrician (Residential)',
      company: 'Urban Home Services',
      location: 'Powai, Mumbai',
      city: 'Mumbai',
      workMode: 'On-site',
      category: 'Electrician',
      type: 'Full-time',
      experience: '2+ years',
      qualification: 'ITI / Diploma',
      salaryMin: 25000,
      salaryMax: 40000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Fix wiring, sockets, fans and MCB faults for home service bookings in Powai and Vikhroli. Fixed salary plus per-job incentive; tools and test meter provided.',
      responsibilities: [
        'Attend 4 to 6 home service jobs per day on the app',
        'Diagnose wiring faults, short circuits and MCB trips',
        'Install fans, lights, geysers and inverters safely',
        'Collect customer payment on the app after the job'
      ],
      requirements: [
        'ITI in Electrical or 2+ years of on-site electrical work',
        'Own basic tool kit and a smartphone',
        'Knowledge of earthing and safety isolation',
        'Willing to travel within 8 km of Powai'
      ],
      skills: ['Wiring', 'MCB', 'Fan Installation', 'Electrical Safety'],
      postedAt: daysAgo(5),
      contactEmail: 'jobs@urbanhome.example',
      status: 'published'
    },
    {
      id: 12,
      title: 'Plumber',
      company: 'Fix-it Home Solutions',
      location: 'Whitefield, Bengaluru',
      city: 'Bengaluru',
      workMode: 'On-site',
      category: 'Plumber',
      type: 'Full-time',
      experience: '1 - 2 years',
      qualification: 'Below 10th Pass',
      salaryMin: 22000,
      salaryMax: 35000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Handle tap, pipe leakage and bathroom fitting jobs for apartment customers in Whitefield. You will get a monthly fixed pay plus job-based incentives.',
      responsibilities: [
        'Repair tap, flush, washbasin and pipeline leakages',
        'Install new fittings, taps and water purifier units',
        'Check water pressure and clear blocked drains',
        'Explain the fix and charges to the customer politely'
      ],
      requirements: [
        '1+ year of plumbing experience in apartments or buildings',
        'Own pipe wrench, plunger and basic tool kit',
        'Two-wheeler preferred for travelling between jobs'
      ],
      skills: ['Pipe Fitting', 'Leak Repair', 'Drain Cleaning'],
      postedAt: daysAgo(6),
      contactEmail: 'hiring@fixithome.example',
      status: 'published'
    },
    {
      id: 13,
      title: 'AC Technician',
      company: 'Cool Air Services',
      location: 'Gachibowli, Hyderabad',
      city: 'Hyderabad',
      workMode: 'On-site',
      category: 'Technician / ITI',
      type: 'Full-time',
      experience: '1 - 2 years',
      qualification: 'ITI / Diploma',
      salaryMin: 20000,
      salaryMax: 32000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Service and install split ACs for residential and office customers in Gachibowli. You get a fixed salary, travel allowance and a per-installation bonus.',
      responsibilities: [
        'Install, service and gas-charge split and window ACs',
        'Diagnose cooling, water leakage and compressor faults',
        'Carry out deep cleaning of indoor and outdoor units',
        'Complete the service report on the technician app'
      ],
      requirements: [
        'ITI in Refrigeration or AC technician certificate',
        '1+ year of hands-on AC servicing experience',
        'Able to climb ladders and work at height with safety gear'
      ],
      skills: ['AC Installation', 'Gas Charging', 'Fault Diagnosis'],
      postedAt: daysAgo(6),
      contactEmail: 'service@coolair.example',
      status: 'published'
    },
    {
      id: 14,
      title: 'Telecaller (Work From Home)',
      company: 'SmartLead Services',
      location: 'Work From Home, Mumbai',
      city: 'Mumbai',
      workMode: 'Remote',
      category: 'Telecalling',
      type: 'Part-time',
      experience: 'Fresher',
      qualification: '12th Pass',
      salaryMin: 15000,
      salaryMax: 22000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Call customers about a loan service from home. You get a 5-hour flexible shift, fixed salary plus per-conversion incentive. Training is provided for the first three days.',
      responsibilities: [
        'Make 80 to 100 outbound calls per day from the calling list',
        'Explain the product clearly and note interested leads',
        'Update call remarks in the CRM after every call',
        'Follow the calling script and compliance rules'
      ],
      requirements: [
        '12th pass with basic English and fluent Hindi',
        'Working smartphone or laptop with stable internet',
        'Quiet space at home for calls',
        'No prior experience required'
      ],
      skills: ['Telecalling', 'Hindi Communication', 'CRM'],
      postedAt: daysAgo(7),
      contactEmail: 'talent@smartlead.example',
      status: 'published'
    },
    {
      id: 15,
      title: 'Field Sales Executive',
      company: 'GrowMore Finance',
      location: 'Vaishali Nagar, Jaipur',
      city: 'Jaipur',
      workMode: 'On-site',
      category: 'Field Sales',
      type: 'Full-time',
      experience: '1 - 2 years',
      qualification: '12th Pass',
      salaryMin: 18000,
      salaryMax: 28000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Meet shop owners and small businesses in Jaipur to open loan files. Fixed salary plus attractive per-file incentive; monthly target of 15 disbursements.',
      responsibilities: [
        'Visit 10 to 12 shops daily in the assigned Jaipur area',
        'Explain loan products and collect KYC documents',
        'Follow up with customers until the file is disbursed',
        'Submit the daily activity report to the branch manager'
      ],
      requirements: [
        'Two-wheeler and valid driving licence',
        '1+ year of field sales experience preferred',
        'Fluent Hindi; basic English for documentation',
        'Comfortable with a target-based role'
      ],
      skills: ['Field Sales', 'Lead Generation', 'Documentation'],
      postedAt: daysAgo(7),
      contactEmail: 'branch@growmore.example',
      status: 'published'
    },
    {
      id: 16,
      title: 'Counter Sales Associate',
      company: 'Fashion Point Retail',
      location: 'Salt Lake, Kolkata',
      city: 'Kolkata',
      workMode: 'On-site',
      category: 'Retail / Counter Sales',
      type: 'Full-time',
      experience: 'Fresher',
      qualification: '12th Pass',
      salaryMin: 14000,
      salaryMax: 18000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Sell garments at our Salt Lake showroom and help customers find the right size. Fixed salary plus 1% sales incentive, and an extra bonus during festival season.',
      responsibilities: [
        'Greet walk-in customers and understand what they need',
        'Show products, sizes and offer suggestions',
        'Bill the sale on the POS system and pack the item',
        'Refold and arrange stock on the display racks'
      ],
      requirements: [
        '12th pass, freshers welcome',
        'Fluent Bengali and Hindi; basic English',
        'Comfortable standing through a 9-hour showroom shift',
        'Weekly off on a rotational basis'
      ],
      skills: ['Retail Sales', 'Customer Service', 'Billing'],
      postedAt: daysAgo(8),
      contactEmail: 'store@fashionpoint.example',
      status: 'published'
    },
    {
      id: 17,
      title: 'Warehouse Packer / Helper',
      company: 'Nirmaan Logistics',
      location: 'Bhiwandi, Thane',
      city: 'Thane',
      workMode: 'On-site',
      category: 'Warehouse / Helper',
      type: 'Full-time',
      experience: 'Fresher',
      qualification: 'Below 10th Pass',
      salaryMin: 13000,
      salaryMax: 16500,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Pack e-commerce parcels at our Bhiwandi fulfilment centre. Pick, pack and label 150 to 200 orders per shift. Overtime is paid at double rate.',
      responsibilities: [
        'Pick products from the rack as per the order slip',
        'Pack, seal and label parcels for dispatch',
        'Keep the packing station and trolley organised',
        'Scan parcels before handing them to the dispatch team'
      ],
      requirements: [
        'Freshers welcome; training provided on day one',
        'Aadhaar card and bank account for salary credit',
        'Able to stand and lift up to 15 kg through the shift'
      ],
      skills: ['Packing', 'Order Picking', 'Barcode Scanning'],
      postedAt: daysAgo(8),
      contactEmail: 'warehouse@nirmaan.example',
      status: 'published'
    },
    {
      id: 18,
      title: 'Office Boy / Peon',
      company: 'Agarwal & Associates',
      location: 'Connaught Place, Delhi NCR',
      city: 'Delhi NCR',
      workMode: 'On-site',
      category: 'Office Boy / Peon',
      type: 'Full-time',
      experience: 'Fresher',
      qualification: '10th Pass',
      salaryMin: 13000,
      salaryMax: 16000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Support a CA office in Connaught Place with filing, tea service and bank errands. Fixed day shift, Sunday off and PF benefits from the first month.',
      responsibilities: [
        'Serve tea and water to staff and visiting clients',
        'Deliver documents to banks and government offices nearby',
        'Keep the office files, stationery and pantry stocked',
        'Run small errands assigned by the office manager'
      ],
      requirements: [
        '10th pass with basic reading and writing',
        'Comfortable travelling by metro within Delhi',
        'Punctual and well mannered'
      ],
      skills: ['Office Support', 'Filing', 'Errands'],
      postedAt: daysAgo(9),
      contactEmail: 'office@agarwalassociates.example',
      status: 'published'
    },
    {
      id: 19,
      title: 'Beautician / Hair Stylist',
      company: 'Glow Salon & Spa',
      location: 'Hazratganj, Lucknow',
      city: 'Lucknow',
      workMode: 'On-site',
      category: 'Beautician',
      type: 'Full-time',
      experience: '1 - 2 years',
      qualification: '12th Pass',
      salaryMin: 15000,
      salaryMax: 25000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Provide hair cutting, threading, facial and waxing services at our Hazratganj salon. Fixed salary plus 10% commission on service revenue; product training provided.',
      responsibilities: [
        'Deliver hair, skin and threading services to walk-in clients',
        'Recommend the right salon products after consultation',
        'Maintain hygiene of tools and the workstation',
        'Achieve the monthly service revenue target'
      ],
      requirements: [
        'Beauty parlour or cosmetology course completed',
        '1+ year of salon experience preferred',
        'Friendly and presentable with clients',
        'Fluent Hindi; basic English'
      ],
      skills: ['Hair Styling', 'Threading', 'Facial', 'Client Handling'],
      postedAt: daysAgo(9),
      contactEmail: 'hr@glowsalon.example',
      status: 'published'
    },
    {
      id: 20,
      title: 'Ward Boy / Patient Care Assistant',
      company: 'Aashray Multispeciality Hospital',
      location: 'Kukatpally, Hyderabad',
      city: 'Hyderabad',
      workMode: 'On-site',
      category: 'Nurse / Ward Boy',
      type: 'Full-time',
      experience: 'Fresher',
      qualification: '10th Pass',
      salaryMin: 16000,
      salaryMax: 21000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Assist admitted patients in the general ward with movement, meals and basic care. Rotational shifts with night allowance, free uniform and staff meals.',
      responsibilities: [
        'Help patients move between the bed, wheelchair and washroom',
        'Deliver meals and water to patients on time',
        'Change bed linen and keep the ward area clean',
        'Inform the staff nurse when a patient needs attention'
      ],
      requirements: [
        '10th pass; freshers trained on the job',
        'Able to lift and support patients with assistance',
        'Comfortable with rotational day and night shifts',
        'Clean police verification required'
      ],
      skills: ['Patient Care', 'Ward Support', 'Hygiene'],
      postedAt: daysAgo(10),
      contactEmail: 'hr@aashrayhospital.example',
      status: 'published'
    },
    {
      id: 21,
      title: 'Tailor / Cutting Master',
      company: 'Rajwadi Boutique',
      location: 'Ring Road, Surat',
      city: 'Surat',
      workMode: 'On-site',
      category: 'Tailoring',
      type: 'Full-time',
      experience: '2+ years',
      qualification: 'Below 10th Pass',
      salaryMin: 18000,
      salaryMax: 26000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Stitch blouses, kurtis and lehengas for boutique customers in Surat. Piece-rate incentive on top of fixed salary during the wedding season.',
      responsibilities: [
        'Take body measurements and prepare the cutting as per design',
        'Stitch blouses, kurtis and lehenga sets on a single needle machine',
        'Carry out alterations requested by the customer',
        'Finish the garment with proper lining and hooks'
      ],
      requirements: [
        '2+ years of tailoring experience, cutting knowledge preferred',
        'Own machine not required — boutique machines provided',
        'Able to complete 2 to 3 pieces per day'
      ],
      skills: ['Tailoring', 'Cutting', 'Alteration'],
      postedAt: daysAgo(11),
      contactEmail: 'boutique@rajwadi.example',
      status: 'published'
    },
    {
      id: 22,
      title: 'Machine Operator',
      company: 'Shreeji Plastics',
      location: 'Naroda, Ahmedabad',
      city: 'Ahmedabad',
      workMode: 'On-site',
      category: 'Machine Operator',
      type: 'Full-time',
      experience: '1 - 2 years',
      qualification: 'ITI / Diploma',
      salaryMin: 17000,
      salaryMax: 23000,
      salaryPeriod: 'month',
      currency: 'INR',
      description:
        'Operate injection moulding machines on the factory floor in Naroda. Three rotating shifts, canteen facility and overtime paid at double rate.',
      responsibilities: [
        'Start, monitor and stop injection moulding machines as per the plan',
        'Check the output for defects and record the hourly production',
        'Carry out basic cleaning and lubrication of the machine',
        'Report breakdowns to the shift supervisor immediately'
      ],
      requirements: [
        'ITI pass preferred; 1+ year of factory machine experience',
        'Comfortable with rotating day, night and general shifts',
        'Able to read the production sheet'
      ],
      skills: ['Machine Operation', 'Quality Check', 'Shop Floor Safety'],
      postedAt: daysAgo(12),
      contactEmail: 'plant@shreejiplastics.example',
      status: 'published'
    }
  ];
};
