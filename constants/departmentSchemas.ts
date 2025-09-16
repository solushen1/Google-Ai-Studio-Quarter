import { Department } from '../types';

export const DEPARTMENT_SCHEMAS: Department[] = [
  // Example 1: Branch Church Quarterly Report
  {
    department: "Branch Church Quarterly Report",
    sections: [
      { 
        name: "General Information", 
        fields: [
          { label: "Branch Church Name", type: "text"}, 
          { label: "Reporting Area", type: "text" }, 
          { label: "Reporting Quarter", type: "text" }, 
          { label: "Reporting Leader Name", type: "text" },
          { label: "Position", type: "text" },
          { label: "Date Submitted", type: "date" }
        ] 
      },
      { 
        name: "1. General Membership", 
        type: "table", 
        tableType: "labeled",
        columns: ["Item", "Details"], 
        rows: [
          "Total Active Sabbath School Members", 
          "New Members This Quarter", 
          "Inactive Members (reasons if known)", 
          "New Baptism Candidates", 
          "Member Relocations / Transfers", 
          "New Interests"
        ] 
      },
      { 
        name: "2. Youth and Children's Program", 
        type: "table", 
        tableType: "grid",
        columns: ["Date", "Kids/Youth Activities Conducted", "No. of Involved", "Number/Details", "Training Needs - Details"], 
        rows: ["", "", ""] 
      },
      { 
        name: "3. Bible Studies", 
        type: "table", 
        tableType: "grid",
        columns: ["Frequency", "Teacher(s)", "Topics Covered", "Attendance"], 
        rows: ["", "", ""]
      },
      { 
        name: "4. Lay Activities (e.g. Branch S. School, Youth Outreach)", 
        type: "table", 
        tableType: "grid",
        columns: ["Date", "Description of Activity", "Participants", "Results / Impact"], 
        rows: ["", "", ""]
      },
      { 
        name: "5. Special Divine Services/Meetings/Highlights", 
        type: "table", 
        tableType: "grid",
        columns: ["Date", "DS Worship/Meetings/Highlights", "Guest Speaker(s) / Highlights"], 
        rows: ["", "", ""]
      },
      { 
        name: "6. Ministerial & Eldership Support/Visit", 
        type: "table", 
        tableType: "labeled",
        columns: ["Item", "Details"], 
        rows: [
          "Support/Visits received from Main Church",
          "Support/Visits received from Branch Church (This is only to be filled by cell churches)",
          "Ministerial Visits",
          "Challenges in spiritual leadership (if any)"
        ] 
      },
      { 
        name: "7. Visitation Programs", 
        type: "table", 
        tableType: "grid",
        columns: ["Date", "No. of Visits", "Nature of Visit", "Special Needs / Follow-ups Noted"], 
        rows: ["", "", ""]
      },
      { 
        name: "8. Prayer Walks Conducted", 
        type: "table", 
        tableType: "grid",
        columns: ["Frequency", "Location", "Participants", "Outcomes/Testimonies"], 
        rows: ["", "", ""]
      },
      { 
        name: "9. Women's Ministries Activities", 
        type: "table", 
        tableType: "grid",
        columns: ["Date", "Fellowship Meetings / Outreach Conducted", "Attendance", "Details"], 
        rows: ["", "", ""]
      },
      {
        name: "10. Offerings & Finance",
        type: "table",
        tableType: "labeled",
        columns: ["Item", "Details"],
        rows: [
          "Total Offerings Collected",
          "Transferred to Main Church (Yes/No)",
          "If yes, then how much Transferred",
          "Special Projects/Needs",
          "Donations/Pledges Made",
          "Summary of Needs Next Quarter",
          "If no normal Offering Collection Indicate reason"
        ]
      },
      {
        name: "11. Facilities & Logistics",
        type: "table",
        tableType: "labeled",
        columns: ["Item", "Details"],
        rows: [
          "Worship Venue Condition",
          "Equipment Needs (chairs, tents, etc.)",
          "Land or Property Progress",
          "Challenges in Logistics"
        ]
      },
      {
        name: "12. Challenges & Recommendations",
        type: "table",
        tableType: "labeled",
        columns: ["Item", "Details"],
        rows: [
          "Main Challenges",
          "Suggestions for Improvement",
          "Support needed from Church Board/Ministers"
        ]
      },
      {
        name: "13. Acknowledgments",
        type: "table",
        tableType: "labeled",
        columns: ["Item", "Details"],
        rows: [
          "Recognition of Help Received",
          "Member Contributions Worth Noting",
          "Encouraging Testimonies or Answered Prayers"
        ]
      },
      {
        name: "14. Summary & Next Steps",
        type: "table",
        tableType: "labeled",
        columns: ["Item", "Details"],
        rows: [
          "Summary of Spiritual Health",
          "Goals for Next Quarter",
          "Planned Activities",
          "Summary Comment (optional)"
        ]
      },
      {
        name: "Additional Photos",
        fields: [{ label: "Attach additional photos or supporting documents if needed.", type: "textarea" }],
        allowPhotos: true
      },
      {
        name: "Branch/Cell Leaders",
        fields: [
          { label: "Elder", type: "text" },
          { label: "Elder's Contact", type: "text" },
          { label: "Report Submitted By", type: "text" },
          { label: "Submitter's Contact", type: "text" }
        ]
      },
      {
        name: "Other Leaders (Indicate Name and Position)",
        type: "table",
        tableType: "grid",
        columns: ["Name", "Position", "Contact"],
        rows: ["", "", ""]
      }
    ]
  },
  // Example 2: Elders' Department Quarterly Report
  {
    department: "Elders' Department",
    sections: [
      { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Quarter", type: "text" }, { label: "Year", type: "text" }] },
      { name: "Details Table", type: "table", columns: ["Item", "Details"], rows: ["Church Name", "Mission/Conference", "Head Elder", "Number of Serving Elders", "Date Submitted"]},
      { name: "Worship & Service Leadership", type: "table", columns: ["Activity", "Number Conducted", "Notes"], rows: ["Sabbath Worship Services Led by Elders", "Communion Services Assisted/Conducted", "Midweek Prayer Meetings Led", "Funerals, Weddings, Special Services"], allowPhotos: true },
      { name: "Pastoral Care & Visitation", type: "table", columns: ["Activity", "Number/Details"], rows: ["Home Visits", "Hospital/Prison Visits", "Member Counselling/Prayer Sessions", "Bible Studies Conducted"], allowPhotos: true },
      { name: "Leadership & Support", type: "table", columns: ["Activity", "Details"], rows: ["Elders' Meetings Held", "Training/Workshops Attended", "Mentoring of Youth Leaders", "Support to Other Church Departments"], allowPhotos: true },
      { name: "Financial Accountability (Budget Acquittal)", type: "table", columns: ["Item", "Approved Budget (K)", "Actual Expenditure (K)", "Balance (K)", "Notes"], rows: ["Elders' Meetings & Retreats", "Visitation & Pastoral Care", "Training & Workshops", "Evangelism/Support Programs", "Other (Emergency Support)"] },
      { name: "Challenges & Needs", fields: [{ label: "List Challenges and Needs", type: "textarea" }] },
      { name: "Plans for Next Quarter", fields: [{ label: "List Plans for Next Quarter", type: "textarea" }] },
      { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Clerk/Secretary (if applicable)", type: "signature" }, { label: "Received by", type: "signature" }] },
    ]
  },
   // Example 3: Personal Ministries Quarterly Report
  {
    department: "Personal Ministries",
    sections: [
      { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Quarter", type: "text" }, { label: "Year", type: "text" } ]},
      { name: "Details Table", type: "table", columns: ["Item", "Details"], rows: ["Church Name", "Mission/Conference", "Personal Ministries Leader", "Assistant/Secretary", "Date Submitted"]},
      { name: "Core Evangelism & Outreach", type: "table", columns: ["Activity", "Number/Details"], rows: ["Bible Studies Given", "Missionary Contacts Made", "Baptisms/Professions of Faith Resulting", "Tracts/Books Distributed", "Evangelistic Meetings/Crusades Held", "Interest Coordinator Follow-ups"], allowPhotos: true },
      { name: "Departmental Subdivisions Activity Report", fields: [
          { label: "A. Bible Study Ministry / Lay Instructors", type: "textarea" },
          { label: "B. Small Groups / Cell Ministry", type: "textarea" },
          { label: "C. Literature Evangelism / Missionary Volunteers", type: "textarea" },
          { label: "D. Community Services / Dorcas", type: "textarea" },
          { label: "E. Adventist Men", type: "textarea" },
          { label: "F. Spirit of Prophecy Promotion", type: "textarea" }
      ], allowPhotos: true},
      { name: "Training & Member Involvement", type: "table", columns: ["Activity", "Details/Numbers"], rows: ["Training Seminars Held", "Members Trained", "Outreach Participation Rate", "Special Days Observed"] },
      { name: "Financial Accountability (K)", type: "table", columns: ["Item", "Collected", "Used", "Balance", "Notes"], rows: ["Personal Ministries Offerings", "Evangelism Fund", "Community Services Fund", "Special Donations"] },
      { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
      { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
      { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Clerk/Secretary (if applicable)", type: "signature" }, { label: "Received by", type: "signature" }] },
    ]
  },
  // Example 4: Adventist Possibility Ministries
  {
    department: "Adventist Possibility Ministries",
    sections: [
        { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Quarter", type: "text" }, { label: "Year", type: "text" }, { label: "Mission/Conference", type: "text" }] },
        { name: "Details Table", type: "table", columns: ["Item", "Details"], rows: ["APM Leader", "Assistant/Secretary", "Committee Members", "Date Submitted"] },
        { name: "Core Ministry Areas & Activities", type: "table", columns: ["Area of Ministry", "Activities Conducted", "Number/Details"], rows: ["Ministry to the Blind/Visually Impaired", "Ministry to the Deaf/Hearing Impaired", "Ministry to the Physically Challenged", "Ministry to Orphans & Vulnerable Children", "Ministry to Widows/Widowers & Single Parents", "Ministry to the Elderly", "Awareness/Sensitization Programs"], allowPhotos: true },
        { name: "Participation & Support", fields: [{ label: "Volunteers Involved", type: "number" }, { label: "Training Conducted", type: "textarea" }, { label: "Families/Individuals Assisted", type: "number" }] },
        { name: "Financial Accountability (K)", type: "table", columns: ["Item", "Collected", "Used", "Balance", "Notes"], rows: ["APM Offerings", "Welfare/Support Funds", "Donations (Special)"] },
        { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
        { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
        { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Secretary (if applicable)", type: "signature" }, { label: "Received by", type: "signature" }] },
    ]
  },
  // Example 5: Children's Ministries
  {
    department: "Children’s Ministries",
    sections: [
        { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Quarter", type: "text" }, { label: "Year", type: "text" }, { label: "Mission/Conference", type: "text" }] },
        { name: "Details Table", type: "table", columns: ["Item", "Details"], rows: ["Children's Ministries Leader", "Assistant(s)", "Teachers/Volunteers", "Number of Children (0–14 years)", "Date Submitted"] },
        { name: "Sabbath School Divisions", type: "table", columns: ["Division", "Number Enrolled", "Average Attendance", "Teachers Assigned", "Notes"], rows: ["Beginners (0-2 yrs)", "Kindergarten (3-5 yrs)", "Primary (6-9 yrs)", "Juniors (10-14 yrs)"] },
        { name: "Programs & Activities Conducted", type: "table", columns: ["Activity", "Details/Results"], rows: ["Weekly Children's Sabbath School Classes", "Vacation Bible School", "Children's Sabbath / Special Days", "Bible Quiz/Story Programs", "Outreach/Mission Projects"], allowPhotos: true },
        { name: "Participation & Involvement", fields: [{ label: "Average Weekly Attendance", type: "number" }, { label: "Active Teachers/Volunteers", type: "number" }, { label: "Parent Involvement", type: "textarea" }] },
        { name: "Financial Accountability (K)", type: "table", columns: ["Item", "Collected", "Used", "Balance", "Notes"], rows: ["Children's Ministries Fund", "Vacation Bible School Fund", "Special Donations"] },
        { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
        { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
        { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Assistant", type: "signature" }, { label: "Received by", type: "signature" }] },
    ]
  },
  // Example 6: Communication Department
  {
    department: "Communication Department",
    sections: [
        { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Quarter", type: "text" }, { label: "Year", type: "text" }, { label: "Mission/Conference", type: "text" }] },
        { name: "Details Table", type: "table", columns: ["Item", "Details"], rows: ["Communication Secretary", "Assistant(s)", "Committee Members", "Date Submitted"] },
        { name: "Media & Publicity", type: "table", columns: ["Activity", "Number/Details"], rows: ["Weekly Announcements Managed", "Church Bulletin/Newsletter Produced", "Social Media Updates Posted", "Audio/Visual Support Provided", "Photography/Videography Coverage", "Special Events Publicized"], allowPhotos: true },
        { name: "Communication with Church Members & Conference", type: "table", columns: ["Activity", "Number/Details"], rows: ["Information Shared with Members", "Reports/Updates Sent to District/Conference", "Notices Circulated"] },
        { name: "Training & Capacity Building", type: "table", columns: ["Activity", "Number/Details"], rows: ["Media/Communication Trainings Conducted", "Volunteers Trained", "Equipment Upgrades/Needs"] },
        { name: "Financial Accountability (K)", type: "table", columns: ["Item", "Collected", "Used", "Balance", "Notes"], rows: ["Communication Fund", "Media/Technology Support", "Special Donations"] },
        { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
        { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
        { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Assistant", type: "signature" }, { label: "Received by", type: "signature" }] },
    ]
  },
    // Example 7: Education Department
  {
    department: "Education Department",
    sections: [
      { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Quarter", type: "text" }, { label: "Year", type: "text" }, { label: "Mission/Conference", type: "text" }] },
      { name: "Details Table", type: "table", columns: ["Item", "Details"], rows: ["Education Secretary", "Assistant/Committee Members", "Home & School Association Active?", "Date Submitted"] },
      { name: "Programs & Activities Conducted", type: "table", columns: ["Activity", "Details/Results"], rows: ["Education Sabbath", "Promotion of Adventist Education", "Support to Adventist Schools", "Scholarships/Bursaries", "Home & School Association", "Career Guidance"], allowPhotos: true },
      { name: "Students & Teachers Involvement", type: "table", columns: ["Item", "Number/Details"], rows: ["Adventist Teachers in Church", "Students in Adventist Schools", "Students in Public/Other Schools", "Mentorship/Support Programs Conducted"] },
      { name: "Training & Capacity Building", type: "table", columns: ["Activity", "Details"], rows: ["Teacher/Parent Seminars", "Student Leadership Training", "Youth Education Workshops", "Other"] },
      { name: "Financial Accountability (K)", type: "table", columns: ["Item", "Collected", "Used", "Balance", "Notes"], rows: ["Education Department Fund", "Scholarship/Bursary Fund", "Special Donations"] },
      { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
      { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
      { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Committee Member", type: "signature" }, { label: "Received by", type: "signature" }] },
    ]
  },
  // Example 8: Family Ministries
  {
    department: "Family Ministries",
    sections: [
      { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Quarter", type: "text" }, { label: "Year", type: "text" }, { label: "Mission/Conference", type: "text" }] },
      { name: "Details Table", type: "table", columns: ["Item", "Details"], rows: ["Family Ministries Leaders", "Assistant(s) / Committee Members", "Date Submitted"] },
      { name: "Programs & Activities Conducted", type: "table", columns: ["Activity", "Theme/Details", "Attendance/Results"], rows: ["Family Life Sabbath", "Marriage Enrichment Program", "Parenting Seminar", "Counseling Sessions", "Youth/Young Adult Family Program", "Community/Outreach"], allowPhotos: true },
      { name: "Participation & Involvement", fields: [{ label: "Families Reached", type: "number" }, { label: "Couples Reached", type: "number" }, { label: "Youth/Young Adults Reached", type: "number" }, { label: "Volunteers Involved", type: "number" }] },
      { name: "Collaboration with Other Departments", type: "table", columns: ["Department", "Joint Activities", "Results"], rows: ["Children's Ministries", "Youth Ministries", "Elders / Personal Ministries"] },
      { name: "Financial Accountability (K)", type: "table", columns: ["Item", "Collected", "Used", "Balance", "Notes"], rows: ["Family Ministries Fund", "Marriage/Parenting Programs", "Retreats/Conferences", "Special Donations"] },
      { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
      { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
      { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Committee Member", type: "signature" }, { label: "Received by", type: "signature" }] },
    ]
  },
  // Example 9: Health Ministries
  {
    department: "Health Ministries",
    sections: [
        { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Quarter", type: "text" }, { label: "Year", type: "text" }, { label: "Mission/Conference", type: "text" }] },
        { name: "Details Table", type: "table", columns: ["Item", "Details"], rows: ["Health Ministries Leader", "Assistant(s) / Committee Members", "Date Submitted"] },
        { name: "Programs & Activities Conducted", type: "table", columns: ["Activity", "Theme/Details", "Attendance/Results"], rows: ["Health Emphasis Day", "Health Seminar", "Cooking Class", "Medical Missionary Program", "Health Screening", "Community Health Expo"], allowPhotos: true },
        { name: "Participation & Involvement", fields: [{ label: "Church Members Reached", type: "number" }, { label: "Community Members Reached", type: "number" }, { label: "Health Professionals Involved", type: "textarea" }, { label: "Volunteers Engaged", type: "number" }] },
        { name: "Collaboration with Other Departments", type: "table", columns: ["Department", "Joint Activity", "Results"], rows: ["Family Ministries", "Youth Ministries", "Adventist Possibility Ministries", "Personal Ministries"] },
        { name: "Financial Accountability (K)", type: "table", columns: ["Item", "Collected", "Used", "Balance", "Notes"], rows: ["Health Ministries Fund", "Health Expo / Outreach Fund", "Special Donations"] },
        { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
        { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
        { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Committee Member", type: "signature" }, { label: "Received by Church Clerk", type: "signature" }] },
    ]
  },
  // Example 10: Music Department
  {
    department: "Music Department",
    sections: [
        { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Quarter", type: "text" }, { label: "Year", type: "text" }, { label: "Mission/Conference", type: "text" }] },
        { name: "Details Table", type: "table", columns: ["Item", "Details"], rows: ["Music Director", "Assistant(s)", "Choirs/Groups in Church", "Date Submitted"] },
        { name: "Choirs, Groups & Participation", type: "table", columns: ["Group", "Members", "Frequency of Practice", "Performances This Quarter", "Notes"], rows: ["Main Church Choir", "Youth Choir", "Children's Choir", "Praise Team", "Quartet & Solos"] },
        { name: "Programs & Activities Conducted", type: "table", columns: ["Activity", "Theme/Details", "Attendance/Results"], rows: ["Special Music for Worship", "Music Day", "Concert / Outreach", "Music Workshop", "District/Conference Events"], allowPhotos: true },
        { name: "Member Development & Training", fields: [{ label: "New Members Recruited", type: "number" }, { label: "Training Conducted", type: "textarea" }, { label: "Instruments Available", type: "textarea" }, { label: "Instruments Needed", type: "textarea" }] },
        { name: "Financial Accountability (K)", type: "table", columns: ["Item", "Collected", "Used", "Balance", "Notes"], rows: ["Music Fund", "Concert/Outreach Support", "Instrument/Equipment Donations"] },
        { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
        { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
        { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Assistant", type: "signature" }, { label: "Received by", type: "signature" }] },
    ]
  },
  // Example 11: Public Affairs & Religious Liberty (PARL)
  {
    department: "Public Affairs & Religious Liberty (PARL)",
    sections: [
      { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Quarter", type: "text" }, { label: "Year", type: "text" }, { label: "Mission/Conference", type: "text" }] },
      { name: "Details Table", type: "table", columns: ["Item", "Details"], rows: ["PARL Leader", "Assistant(s) / Committee Members", "Date Submitted"] },
      { name: "Programs & Activities Conducted", type: "table", columns: ["Activity", "Theme/Details", "Attendance/Results"], rows: ["Religious Liberty Sabbath", "Awareness Program", "Advocacy for Members", "Community Engagement", "Relations with Civic Leaders", "Distribution of Liberty Magazines"], allowPhotos: true },
      { name: "Member Support & Cases", type: "table", columns: ["Case Type", "Number/Details", "Outcome"], rows: ["Workplace Sabbath Accommodation", "School/Exams Sabbath Accommodation", "Other Religious Liberty Issues"] },
      { name: "Collaboration with Other Departments", type: "table", columns: ["Department", "Joint Activity", "Results"], rows: ["Youth Ministries", "Education", "Elders/Church Board"] },
      { name: "Financial Accountability (K)", type: "table", columns: ["Item", "Collected", "Used", "Balance", "Notes"], rows: ["PARL Fund", "Liberty Magazine Subscriptions", "Special Donations"] },
      { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
      { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
      { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Committee Member", type: "signature" }, { label: "Received by", type: "signature" }] },
    ]
  },
  // Example 12: Sabbath School
  {
    department: "Sabbath School",
    sections: [
        { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Quarter", type: "text" }, { label: "Year", type: "text" }, { label: "Mission/Conference", type: "text" }] },
        { name: "Details Table", type: "table", columns: ["Item", "Details"], rows: ["Sabbath School Superintendent", "Assistant(s)", "Secretary", "Teachers/Facilitators", "Date Submitted"] },
        { name: "Sabbath School Divisions", type: "table", columns: ["Division", "Enrolled", "Average Attendance", "Teachers Assigned", "Notes"], rows: ["Beginners (0-2 yrs)", "Kindergarten (3-5 yrs)", "Primary (6-9 yrs)", "Juniors (10-14 yrs)", "Youth / Young Adults", "Adults"] },
        { name: "Weekly Programs Conducted", type: "table", columns: ["Activity", "Frequency", "Notes"], rows: ["Opening Exercises", "Lesson Study", "Mission Story / Offering", "Special Programs"], allowPhotos: true },
        { name: "Outreach & Mission Activities", type: "table", columns: ["Activity", "Details", "Results"], rows: ["Sabbath School Action Units", "Community Outreach", "Mission Offering Promotion", "Bible Studies"], allowPhotos: true },
        { name: "Financial Accountability (K)", type: "table", columns: ["Item", "Collected", "Used", "Balance", "Notes"], rows: ["Sabbath School Offerings", "Mission Offerings", "Special Donations"] },
        { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
        { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
        { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Secretary", type: "signature" }, { label: "Received by", type: "signature" }] },
    ]
  },
  // Example 13: Adventist Men Department
  {
    department: "Adventist Men Department",
    sections: [
        { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Mission/Conference", type: "text" }, { label: "Quarter/Year", type: "text" }] },
        { name: "Department Details", fields: [{ label: "Department Leader", type: "text" }, { label: "Assistant Leader", type: "text" }, { label: "Secretary/Clerk", type: "text" }, { label: "Reports To", type: "text" }] },
        { name: "Membership & Participation", type: "table", columns: ["Category", "Number", "Notes/Comments"], rows: ["Total Baptized Men in Church", "Registered Adventist Men Members", "Active Participants this Quarter", "New Members Joined", "Members Lost/Inactive"] },
        { name: "Evangelism & Outreach", type: "table", columns: ["Activity/Program", "Date(s)", "Venue/Location", "Attendance/Impact", "Remarks"], rows: ["Evangelistic Crusade", "Bible Study Groups", "Community Service (Cleanup)", "Prison Ministry"], allowPhotos: true },
        { name: "Fellowship & Spiritual Growth", type: "table", columns: ["Event/Activity", "Date(s)", "Attendance", "Key Outcomes"], rows: ["Men's Sunrise Prayer", "Family Enrichment Sabbath", "Regional Men's Camp"], allowPhotos: true },
        { name: "Training & Capacity Building", type: "table", columns: ["Training/Workshop", "Date(s)", "Facilitator", "Participants", "Outcomes"], rows: ["Leadership & Evangelism"] },
        { name: "Financial Report", fields: [{label: "Balance Carried Forward", type: "text"}] },
        { name: "Income", type: "table", columns: ["Income Source", "Amount", "Notes"], rows: ["Offerings/Donations", "Special Projects", "Conference/District Support", "Total Income"] },
        { name: "Expenditure", type: "table", columns: ["Expenditure Category", "Amount", "Notes"], rows: ["Evangelism & Outreach", "Fellowship/Retreats", "Training", "Other (Materials)", "Total Expenditure"] },
        { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
        { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
        { name: "Recommendations to Church Board", fields: [{ label: "List Recommendations", type: "textarea" }] },
        { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Secretary", type: "signature" }, { label: "Received by PM Leader", type: "signature" }] },
    ]
  },
  // Example 14: Bible School Coordinator
  {
    department: "Bible School Coordinator",
    sections: [
        { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Mission/Conference", type: "text" }, { label: "Quarter/Year", type: "text" }] },
        { name: "Department Details", fields: [{ label: "Coordinator", type: "text" }, { label: "Assistant", type: "text" }, { label: "Secretary", type: "text" }, { label: "Reports To", type: "text" }] },
        { name: "Enrolment & Participation", type: "table", columns: ["Category", "Number", "Notes/Comments"], rows: ["Total Students Enrolled (to date)", "New Students This Quarter", "Active Students", "Inactive/Unresponsive Students", "Students Completed Full Course"] },
        { name: "Lessons Distribution & Returns", type: "table", columns: ["Lesson Series Distributed", "No. of Sets Given", "No. Returned/Completed", "Remarks"], rows: ["Discover Bible Guides", "Focus on Prophecy", "Junior Bible Lessons"] },
        { name: "Baptismal Interests & Decisions", type: "table", columns: ["Student Name/Group", "Lessons Completed", "Decision/Interest", "Follow-up Plan"], rows: ["Peter A.", "Mary K.", "Youth group (5 members)"] },
        { name: "Outreach & Support Activities", type: "table", columns: ["Activity/Initiative", "Date(s)", "Location", "Attendance/Impact", "Remarks"], rows: ["Bible School Promotion", "Home Visits/Follow-up", "Combined Evangelism"], allowPhotos: true },
        { name: "Financial Report", fields: [{label: "Balance Carried Forward", type: "text"}] },
        { name: "Income", type: "table", columns: ["Income Source", "Amount", "Notes"], rows: ["Offerings/Donations", "Conference Support", "Other (Love Offerings)", "Total Income"] },
        { name: "Expenditure", type: "table", columns: ["Expenditure Category", "Amount", "Notes"], rows: ["Lesson Materials/Printing", "Transport/Follow-up Visits", "Other (Stationery)", "Total Expenditure"] },
        { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
        { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
        { name: "Recommendations to Church Board", fields: [{ label: "List Recommendations", type: "textarea" }] },
        { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Secretary", type: "signature" }, { label: "Received by PM Leader", type: "signature" }] },
    ]
  },
  // Example 15: Adventist Community Services (ACS) / Dorcas Society
  {
    department: "Adventist Community Services (ACS) / Dorcas Society",
    sections: [
      { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "District/Conference", type: "text" }, { label: "Quarter/Year", type: "text" }] },
      { name: "Department Details", fields: [{ label: "Leader", type: "text" }, { label: "Assistant", type: "text" }, { label: "Secretary/Treasurer", type: "text" }, { label: "Reports To", type: "text" }] },
      { name: "Membership & Participation", type: "table", columns: ["Category", "Number", "Notes/Comments"], rows: ["Total Registered Members", "Active Volunteers This Quarter", "New Members Joined", "Members Inactive/Excused"] },
      { name: "Service & Outreach Activities", type: "table", columns: ["Activity/Project", "Date(s)", "Location", "Beneficiaries/Impact", "Remarks"], rows: ["Food Distribution", "Clothing Drive", "Hospital Visit & Prayer", "Flood Relief Support"], allowPhotos: true },
      { name: "Partnerships & Collaboration", type: "table", columns: ["Organization/Partner", "Nature of Support", "Outcomes"], rows: ["Local Red Cross", "Youth Ministry"] },
      { name: "Training & Capacity Building", type: "table", columns: ["Training/Workshop", "Date", "Facilitator", "Participants", "Key Outcomes"], rows: ["Disaster Response Basics"] },
      { name: "Financial Report", fields: [{label: "Balance Carried Forward", type: "text"}] },
      { name: "Income", type: "table", columns: ["Income Source", "Amount", "Notes"], rows: ["Offerings/Donations", "Special Projects", "Conference/District Support", "Total Income"] },
      { name: "Expenditure", type: "table", columns: ["Expenditure Category", "Amount", "Notes"], rows: ["Food/Clothing Purchases", "Transport/Logistics", "Training/Workshops", "Other (Stationery)", "Total Expenditure"] },
      { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
      { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
      { name: "Recommendations to Church Board", fields: [{ label: "List Recommendations", type: "textarea" }] },
      { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Secretary/Treasurer", type: "signature" }, { label: "Received by PM Leader", type: "signature" }] },
    ]
  },
  // Example 16: Spirit of Prophecy (SOP) Writings Department
  {
    department: "Spirit of Prophecy (SOP) Writings Department",
    sections: [
        { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Mission/Conference", type: "text" }, { label: "Quarter/Year", type: "text" }] },
        { name: "Department Details", fields: [{ label: "Coordinator", type: "text" }, { label: "Assistant", type: "text" }, { label: "Secretary", type: "text" }, { label: "Reports To", type: "text" }] },
        { name: "Membership & Participation", type: "table", columns: ["Category", "Number", "Notes/Comments"], rows: ["Active SOP Committee Members", "Volunteers Supporting Activities", "New Members Involved this Quarter"] },
        { name: "Distribution & Promotion of SOP Literature", type: "table", columns: ["Type of Material Distributed", "Quantity Distributed", "Target Group/Location", "Remarks"], rows: ["Books (Steps to Christ)", "Great Controversy", "Pamphlets/Tracts", "Digital Resources (PDFs, audio)"] },
        { name: "Programs & Activities", type: "table", columns: ["Program/Activity", "Date(s)", "Venue/Location", "Attendance/Impact", "Remarks"], rows: ["SOP Reading Campaign (Desire of Ages)", "Seminar: Spirit of Prophecy & End-Time", "SOP Promotion Sabbath"], allowPhotos: true },
        { name: "Collaboration & Support", type: "table", columns: ["Partner (Dept./Group)", "Activity", "Outcomes"], rows: ["Adventist Youth", "Dorcas/ACS"] },
        { name: "Financial Report", fields: [{label: "Balance Carried Forward", type: "text"}] },
        { name: "Income", type: "table", columns: ["Income Source", "Amount", "Notes"], rows: ["Offerings/Donations", "Literature Sales", "Conference Support", "Total Income"] },
        { name: "Expenditure", type: "table", columns: ["Expenditure Category", "Amount", "Notes"], rows: ["Literature Purchase", "Promotion/Printing", "Training/Programs", "Other (Stationery)", "Total Expenditure"] },
        { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
        { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
        { name: "Recommendations to Church Board", fields: [{ label: "List Recommendations", type: "textarea" }] },
        { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Assistant", type: "signature" }, { label: "Received by Church Clerk", type: "signature" }] },
    ]
  },
  // Example 17: Stewardship Department
  {
    department: "Stewardship Department",
    sections: [
        { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Mission/Conference", type: "text" }, { label: "Quarter/Year", type: "text" }] },
        { name: "Department Details", fields: [{ label: "Stewardship Leader", type: "text" }, { label: "Assistant", type: "text" }, { label: "Reports To", type: "text" }] },
        { name: "Tithes & Offerings Summary", type: "table", columns: ["Category", "This Quarter", "Previous Quarter", "Change (%)", "Remarks"], rows: ["Total Tithes Remitted", "Local Church Budget Offerings", "Sabbath School Offerings", "Mission Offerings", "Special Projects Offerings"] },
        { name: "Stewardship Education & Programs", type: "table", columns: ["Program/Activity", "Date(s)", "Venue/Location", "Attendance", "Key Outcomes"], rows: ["Stewardship Sabbath", "Seminar: Biblical Finance", "Small Group Studies", "Youth Stewardship Sabbath"], allowPhotos: true },
        { name: "Member Participation & Commitment", type: "table", columns: ["Category", "Number/Percentage", "Notes"], rows: ["Members Returning Tithe Regularly", "Members Contributing to Local Budget", "Members Involved in Stewardship Programs"] },
        { name: "Financial Education Initiatives", type: "table", columns: ["Training/Workshop", "Date", "Facilitator", "Participants", "Outcomes"], rows: ["Budgeting & Debt Management"] },
        { name: "Financial Report (Departmental)", fields: [{label: "Balance Carried Forward", type: "text"}] },
        { name: "Income", type: "table", columns: ["Income Source", "Amount", "Notes"], rows: ["Offerings/Donations", "Conference/District Support", "Other (Book Sales)", "Total Income"] },
        { name: "Expenditure", type: "table", columns: ["Expenditure Category", "Amount", "Notes"], rows: ["Stewardship Materials", "Seminars/Workshops", "Promotion/Printing", "Total Expenditure"] },
        { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
        { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
        { name: "Recommendations to Church Board", fields: [{ label: "List Recommendations", type: "textarea" }] },
        { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Assistant", type: "signature" }, { label: "Received by", type: "signature" }] },
    ]
  },
  // Example 18: Women's Ministries
  {
    department: "Women’s Ministries",
    sections: [
        { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Mission/Conference", type: "text" }, { label: "Quarter/Year", type: "text" }] },
        { name: "Department Details", fields: [{ label: "Women's Ministries Leader", type: "text" }, { label: "Assistant", type: "text" }, { label: "Secretary/Treasurer", type: "text" }, { label: "Reports To", type: "text" }] },
        { name: "Membership & Participation", type: "table", columns: ["Category", "Number", "Notes/Comments"], rows: ["Total Women in Church", "Registered Women's Ministries Members", "Active Participants This Quarter", "New Members Involved"] },
        { name: "Programs & Activities", type: "table", columns: ["Program/Activity", "Date(s)", "Venue/Location", "Attendance", "Key Outcomes"], rows: ["Women's Ministries Sabbath", "Small Group Bible Study", "Evangelism Campaign Support", "Women's Retreat", "Family Enrichment Workshop"], allowPhotos: true },
        { name: "Outreach & Community Service", type: "table", columns: ["Activity/Project", "Date(s)", "Location", "Beneficiaries/Impact", "Remarks"], rows: ["Food Distribution", "Hospital Visit & Care Packages", "Clothing Drive"], allowPhotos: true },
        { name: "Leadership Development & Training", type: "table", columns: ["Training/Workshop", "Date", "Facilitator", "Participants", "Outcomes"], rows: ["Leadership & Communication"] },
        { name: "Financial Report", fields: [{label: "Balance Carried Forward", type: "text"}] },
        { name: "Income", type: "table", columns: ["Income Source", "Amount", "Notes"], rows: ["Offerings/Donations", "Fundraising Projects", "Conference Support", "Total Income"] },
        { name: "Expenditure", type: "table", columns: ["Expenditure Category", "Amount", "Notes"], rows: ["Evangelism & Outreach", "Training & Seminars", "Community Service Projects", "Other (Stationery, printing)", "Total Expenditure"] },
        { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
        { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
        { name: "Recommendations to Church Board", fields: [{ label: "List Recommendations", type: "textarea" }] },
        { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Secretary", type: "signature" }, { label: "Received by Church Clerk", type: "signature" }] },
    ]
  },
  // Example 19: Adventist Youth Ministries (Young Adults)
  {
    department: "Adventist Youth Ministries (Young Adults)",
    sections: [
      { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Mission/Conference", type: "text" }, { label: "Quarter/Year", type: "text" }] },
      { name: "Department Details", fields: [{ label: "AYM Leader", type: "text" }, { label: "Young Adults Coordinator", type: "text" }, { label: "Assistant", type: "text" }, { label: "Secretary/Treasurer", type: "text" }, { label: "Reports To", type: "text" }] },
      { name: "Membership & Participation", type: "table", columns: ["Category", "Number", "Notes/Comments"], rows: ["Total Young Adults in Church", "Registered Members", "Active Participants This Quarter", "New Members Involved"] },
      { name: "Spiritual Nurture & Fellowship", type: "table", columns: ["Program/Activity", "Date(s)", "Venue/Location", "Attendance", "Outcomes"], rows: ["Young Adult Sabbath", "Bible Study Fellowship", "Prayer Retreat", "Social Night"], allowPhotos: true },
      { name: "Evangelism & Outreach", type: "table", columns: ["Activity/Project", "Date(s)", "Location", "Beneficiaries/Impact", "Remarks"], rows: ["Evangelism Support", "Hospital Visit", "Literature Distribution", "Digital Evangelism"], allowPhotos: true },
      { name: "Training & Leadership Development", type: "table", columns: ["Training/Workshop", "Date", "Facilitator", "Participants", "Key Outcomes"], rows: ["\"Leading Small Groups\""] },
      { name: "Financial Report", fields: [{label: "Balance Carried Forward", type: "text"}] },
      { name: "Income", type: "table", columns: ["Income Source", "Amount", "Notes"], rows: ["Offerings/Donations", "Fundraising Projects", "Conference/District Support", "Total Income"] },
      { name: "Expenditure", type: "table", columns: ["Expenditure Category", "Amount", "Notes"], rows: ["Evangelism & Outreach", "Retreats/Fellowship Programs", "Training & Leadership Dev.", "Other (Stationery, printing)", "Total Expenditure"] },
      { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
      { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
      { name: "Recommendations to Church Board", fields: [{ label: "List Recommendations", type: "textarea" }] },
      { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Secretary", type: "signature" }, { label: "Received by", type: "signature" }] },
    ]
  },
  // Example 20: Public Campus Ministries (PCM)
  {
    department: "Public Campus Ministries (PCM)",
    sections: [
      { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Mission/Conference", type: "text" }, { label: "Quarter/Year", type: "text" }] },
      { name: "Department Details", fields: [{ label: "PCM Leader/Coordinator", type: "text" }, { label: "Assistant(s)", type: "text" }, { label: "Secretary/Treasurer", type: "text" }, { label: "Reports To", type: "text" }] },
      { name: "Membership & Participation", type: "table", columns: ["Category", "Number", "Notes/Comments"], rows: ["Adventist Students on Campus", "Active PCM Members", "New Students Reached This Quarter", "PCM Volunteers (faculty/staff/support)"] },
      { name: "Spiritual Nurture & Fellowship", type: "table", columns: ["Program/Activity", "Date(s)", "Venue/Location", "Attendance", "Outcomes"], rows: ["Campus Fellowship/Worship", "Bible Study Groups", "Prayer Retreat", "Mentorship Circles"], allowPhotos: true },
      { name: "Evangelism & Outreach", type: "table", columns: ["Activity/Project", "Date(s)", "Location", "Beneficiaries/Impact", "Remarks"], rows: ["Literature Distribution", "Campus Evangelistic Series", "Health Awareness Expo", "Clean-Up Campaign"], allowPhotos: true },
      { name: "Collaboration & Partnerships", type: "table", columns: ["Partner/Organization", "Nature of Collaboration", "Outcomes"], rows: ["Adventist Medical Fellowship", "Dorcas/ACS"] },
      { name: "Training & Leadership Development", type: "table", columns: ["Training/Workshop", "Date", "Facilitator", "Participants", "Key Outcomes"], rows: ["Campus Leadership Skills"] },
      { name: "Financial Report", fields: [{label: "Balance Carried Forward", type: "text"}] },
      { name: "Income", type: "table", columns: ["Income Source", "Amount", "Notes"], rows: ["Offerings/Donations", "Fundraising Projects", "Conference/District Support", "Total Income"] },
      { name: "Expenditure", type: "table", columns: ["Expenditure Category", "Amount", "Notes"], rows: ["Evangelism & Outreach", "Fellowship/Programs", "Training/Leadership", "Other (Stationery)", "Total Expenditure"] },
      { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
      { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
      { name: "Recommendations to Church Board", fields: [{ label: "List Recommendations", type: "textarea" }] },
      { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Secretary", type: "signature" }, { label: "Received by", type: "signature" }] },
    ]
  },
  // Example 21: Ambassador Ministry
  {
    department: "Ambassador Ministry",
    sections: [
      { name: "General Information", fields: [{ label: "Church Name", type: "text" }, { label: "Mission/Conference", type: "text" }, { label: "Quarter/Year", type: "text" }] },
      { name: "Department Details", fields: [{ label: "Ambassador Leader/Coordinator", type: "text" }, { label: "Assistant(s)", type: "text" }, { label: "Secretary/Treasurer", type: "text" }, { label: "Reports To", type: "text" }] },
      { name: "Membership & Participation", type: "table", columns: ["Category", "Number", "Notes/Comments"], rows: ["Total Ambassadors in Church (16-21 yrs)", "Registered Ambassador Members", "Active Participants This Quarter", "New Members Involved"] },
      { name: "Spiritual Growth & Fellowship", type: "table", columns: ["Program/Activity", "Date(s)", "Venue/Location", "Attendance", "Key Outcomes"], rows: ["Ambassador Sabbath", "Bible Study Class (weekly)", "Prayer Retreat", "Fellowship Night"], allowPhotos: true },
      { name: "Evangelism & Outreach", type: "table", columns: ["Activity/Project", "Date(s)", "Location", "Beneficiaries/Impact", "Remarks"], rows: ["Street Preaching", "Hospital Visit", "Literature Distribution", "Clean-Up Drive"], allowPhotos: true },
      { name: "Leadership & Skill Development", type: "table", columns: ["Training/Workshop", "Date", "Facilitator", "Participants", "Key Outcomes"], rows: ["\"Ambassadors in Mission\"", "Public Speaking Workshop"] },
      { name: "Financial Report", fields: [{label: "Balance Carried Forward", type: "text"}] },
      { name: "Income", type: "table", columns: ["Income Source", "Amount", "Notes"], rows: ["Offerings/Donations", "Fundraising Projects", "Conference/District Support", "Total Income"] },
      { name: "Expenditure", type: "table", columns: ["Expenditure Category", "Amount", "Notes"], rows: ["Evangelism & Outreach", "Fellowship/Programs", "Training & Leadership Dev.", "Other (Stationery, printing)", "Total Expenditure"] },
      { name: "Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
      { name: "Plans for Next Quarter", fields: [{ label: "List Plans", type: "textarea" }] },
      { name: "Recommendations to Church Board", fields: [{ label: "List Recommendations", type: "textarea" }] },
      { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Secretary", type: "signature" }, { label: "Received by", type: "signature" }] },
    ]
  },
  // Example 22: Pathfinders Club
  {
    department: "Pathfinders Club",
    sections: [
        { name: "Section 1: General Information", type: "table", columns: ["Field", "Details"], rows: ["Mission/Conference", "Church Name", "Quarter/Year", "Pathfinder Club Name", "Club Director", "Deputy Directors", "Number of Pathfinders Enrolled", "Number of Counsellors/Staff", "Prepared By", "Date Submitted"] },
        { name: "Section 2: Membership Report", type: "table", columns: ["Item", "Number"], rows: ["Total Members Last Quarter", "New Members Enrolled", "Members Transferred In", "Members Transferred Out", "Inactive/Dropped Members", "Current Active Membership"] },
        { name: "Section 3: Club Meetings & Activities", type: "table", columns: ["Activity Type", "Number Held", "Attendance", "Remarks"], rows: ["Regular Club Meetings", "Classwork Sessions (honors, AY classes)", "Campouts/Outdoor Activities", "Marching & Drilling Sessions", "Pathfinder Day/AYM Involvement", "Other Activities"], allowPhotos: true },
        { name: "Section 4: Outreach & Mission", type: "table", columns: ["Outreach Activity", "Date", "Participation", "Impact/Remarks"], rows: ["Community Clean-up (market & roadside)", "Hospital Visit – Singing & Distribution", "Church Involvement - Pathfinder Day"], allowPhotos: true },
        { name: "Section 5: Training & Development", fields: [{ label: "Staff Leadership Training", type: "textarea" }, { label: "Pathfinder Classwork Progress", type: "textarea" }, { label: "Honors Earned", type: "textarea" }, { label: "Investitures Held/Planned", type: "textarea" }] },
        { name: "Section 6: Financial Acquittals", type: "table", columns: ["Item/Activity", "Budget Approved", "Amount Spent", "Balance", "Remarks"], rows: ["Uniforms & Insignia", "Campouts/Field Trips", "Supplies & Equipment", "Community Service Projects", "Other (specify)"] },
        { name: "Section 7: Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
        { name: "Section 8: Goals & Recommendations", fields: [{ label: "List Goals & Recommendations", type: "textarea" }] },
        { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Deputy Director Male", type: "signature" }, { label: "Deputy Director Female", type: "signature" }, { label: "Received by", type: "signature" }] },
    ]
  },
  // Example 23: Young Adventurers Club
  {
    department: "Young Adventurers Club",
    sections: [
      { name: "Section 1: General Information", type: "table", columns: ["Field", "Details"], rows: ["Mission/Conference", "Church Name", "Quarter/Year", "Adventurer Club Name", "Club Director", "Deputy Directors", "Number of Adventurers Enrolled", "Number of Parents/Staff Involved", "Prepared By", "Date Submitted"] },
      { name: "Section 2: Membership Report", type: "table", columns: ["Item", "Number"], rows: ["Total Members Last Quarter", "New Members Enrolled", "Members Transferred In", "Members Transferred Out", "Inactive/Dropped Members", "Current Active Membership"] },
      { name: "Section 3: Club Program & Activities", type: "table", columns: ["Activity Type", "Number Held", "Attendance", "Remarks"], rows: ["Spiritual Programs (devotionals, Bible lessons)", "Family-Based Activities", "Nature/Outdoor Activities", "Health & Skills Development", "Service Projects", "Social/Fellowship Activities", "Other Activities"], allowPhotos: true },
      { name: "Section 4: Outreach & Mission", type: "table", columns: ["Outreach Activity", "Date", "Participation", "Impact/Remarks"], rows: ["Community Service Project – Elderly Visitation", "Church Involvement - Children's Sabbath", "Family/Neighbourhood Outreach"], allowPhotos: true },
      { name: "Section 5: Training & Achievement", fields: [{ label: "Awards Earned (Stars, Chips, Awards)", type: "textarea" }, { label: "Parent Workshops Conducted", type: "textarea" }, { label: "Staff Training Conducted", type: "textarea" }, { label: "Investitures Planned/Held", type: "textarea" }] },
      { name: "Section 6: Financial Acquittals", type: "table", columns: ["Item/Activity", "Budget Approved", "Amount Spent", "Balance", "Remarks"], rows: ["Uniforms & Insignia", "Program Materials & Supplies", "Family Fellowship Activities", "Outings/Field Trips", "Other (specify)"] },
      { name: "Section 7: Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
      { name: "Section 8: Goals & Recommendations", fields: [{ label: "List Goals & Recommendations", type: "textarea" }] },
      { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Deputy Director Male", type: "signature" }, { label: "Deputy Director Female", type: "signature" }, { label: "Received by Church Clerk", type: "signature" }] },
    ]
  },
    // Example 24: Deacons' Department
    {
    department: "Deacons’ Department",
    sections: [
        { name: "Section 1: General Information", type: "table", columns: ["Field", "Details"], rows: ["Mission/Conference", "Church Name", "Quarter/Year", "Head Deacon", "Assistant Head Deacon", "Number of Deacons Serving", "Prepared By", "Date Submitted"] },
        { name: "Section 2: Worship & Ordinances", type: "table", columns: ["Activity", "Number/Details"], rows: ["Communion Services Assisted", "Baptismal Services Assisted", "Funeral Services Assisted", "Sabbath Worship Support", "Other Worship-Related Duties"], allowPhotos: true },
        { name: "Section 3: Church Property & Maintenance", type: "table", columns: ["Item", "Details/Notes"], rows: ["Cleaning & Upkeep of Sanctuary", "Grounds & Property Care", "Repairs/Small Maintenance", "Security & Order", "Other Duties"] },
        { name: "Section 4: Visitation & Welfare Support", type: "table", columns: ["Activity", "Number/Details"], rows: ["Visitation of Sick/Needy", "Support for Widows & Orphans", "Distribution of Aid", "Assistance to Members in Need", "Other Acts of Service"], allowPhotos: true },
        { name: "Section 5: Financial Acquittals", type: "table", columns: ["Activity/Item", "Budget Approved", "Amount Spent", "Balance", "Remarks"], rows: ["Communion Supplies", "Baptismal Supplies", "Welfare/Visitation Support", "Church Maintenance", "Other (specify)"] },
        { name: "Section 6: Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
        { name: "Section 7: Goals & Recommendations", fields: [{ label: "List Goals & Recommendations", type: "textarea" }] },
        { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Assistant Head Deacon", type: "signature" }, { label: "Received by", type: "signature" }] },
    ]
  },
  // Example 25: Deaconesses' Department
  {
    department: "Deaconesses’ Department",
    sections: [
        { name: "Section 1: General Information", type: "table", columns: ["Field", "Details"], rows: ["Mission/Conference", "Church Name", "Quarter/Year", "Head Deaconess", "Assistant Head Deaconess", "Number of Deaconesses Serving", "Prepared By", "Date Submitted"] },
        { name: "Section 2: Worship & Ordinances", type: "table", columns: ["Activity", "Number/Details"], rows: ["Communion Services Prepared", "Communion Supplies", "Baptismal Services Assisted", "Funeral Services Assisted", "Other Worship-Related Duties"], allowPhotos: true },
        { name: "Section 3: Visitation & Care", type: "table", columns: ["Activity", "Number/Details"], rows: ["Visitation of Sick/Shut-ins", "Support for Bereaved Families", "Support for Widows/Orphans", "Welfare/Practical Assistance", "Other Acts of Service"], allowPhotos: true },
        { name: "Section 4: Hospitality & Fellowship", type: "table", columns: ["Item", "Details/Notes"], rows: ["Fellowship Meals Organized", "Hospitality for Visitors/Guests", "Support for Weddings/Child Dedications", "Other Activities"], allowPhotos: true },
        { name: "Section 5: Financial Acquittals", type: "table", columns: ["Activity/Item", "Budget Approved", "Amount Spent", "Balance", "Remarks"], rows: ["Communion Supplies", "Baptismal Supplies", "Welfare/Visitation Support", "Hospitality/Fellowship", "Other (specify)"] },
        { name: "Section 6: Challenges & Needs", fields: [{ label: "List Challenges & Needs", type: "textarea" }] },
        { name: "Section 7: Goals & Recommendations", fields: [{ label: "List Goals & Recommendations", type: "textarea" }] },
        { name: "Signatures", fields: [{ label: "Prepared by", type: "signature" }, { label: "Assistant Head Deaconess", type: "signature" }, { label: "Received by", type: "signature" }] },
    ]
  },
];