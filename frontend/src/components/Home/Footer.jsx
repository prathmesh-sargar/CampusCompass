import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7 text-blue-400"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M4 12h16M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="text-xl font-bold text-white">
                CampusCompass
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Navigate your future — track progress, find opportunities, and
              grow your career with confidence.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                className="text-gray-400 hover:text-blue-400 transition"
                href="#"
              >
                {/* GitHub */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 
                    3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 
                    0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61
                    -.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729
                    1.205.084 1.84 1.238 1.84 1.238 1.07 1.835 2.807 
                    1.304 3.492.997.108-.775.418-1.305.762-1.604
                    -2.665-.305-5.466-1.334-5.466-5.931 
                    0-1.31.469-2.381 1.236-3.221-.124-.304-.536-1.523.117-3.176 
                    0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 
                    2.047.138 3.006.404 2.291-1.552 3.297-1.23 
                    3.297-1.23.653 1.653.242 2.873.118 
                    3.176.77.84 1.235 1.911 1.235 
                    3.221 0 4.609-2.807 5.624-5.479 
                    5.921.43.372.823 1.102.823 2.222v3.293c0 
                    .319.192.694.801.576C20.565 22.092 24 
                    17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <a
                className="text-gray-400 hover:text-blue-400 transition"
                href="#"
              >
                {/* Twitter/X */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.56c-.885.392-1.83.656-2.828.775 
                  1.017-.609 1.797-1.574 2.165-2.724-.951.564-2.005.973-3.127 
                  1.195-.896-.957-2.178-1.555-3.594-1.555-2.717 
                  0-4.924 2.207-4.924 4.924 0 .39.044.765.128 
                  1.124C7.691 8.094 4.066 6.13 1.64 
                  3.161c-.427.733-.666 1.58-.666 
                  2.475 0 1.708.87 3.216 2.188 
                  4.099-.807-.026-1.566-.248-2.229-.616v.062c0 
                  2.385 1.697 4.374 3.946 4.828-.413.112-.849.171-1.296.171-.317 
                  0-.626-.03-.928-.086.627 1.956 2.444 3.379 
                  4.6 3.419-1.68 1.318-3.809 
                  2.105-6.102 2.105-.396 0-.787-.023-1.175-.069 
                  2.179 1.397 4.768 2.213 
                  7.548 2.213 9.142 0 14.307-7.721 
                  13.995-14.646.962-.694 1.797-1.562 
                  2.457-2.549z" />
                </svg>
              </a>
              <a
                className="text-gray-400 hover:text-blue-400 transition"
                href="#"
              >
                {/* LinkedIn */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 
                  0-5 2.239-5 5v14c0 2.761 2.239 
                  5 5 5h14c2.762 0 5-2.239 
                  5-5v-14c0-2.761-2.238-5-5-5zm-11 
                  19h-3v-10h3v10zm-1.5-11.268c-.966 
                  0-1.75-.784-1.75-1.75s.784-1.75 
                  1.75-1.75 1.75.784 
                  1.75 1.75-.784 1.75-1.75 
                  1.75zm13.5 11.268h-3v-5.604c0-1.337-.027-3.061-1.865-3.061-1.867 
                  0-2.154 1.459-2.154 2.963v5.702h-3v-10h2.881v1.367h.041c.401-.76 
                  1.379-1.562 2.839-1.562 3.036 0 3.598 
                  2.002 3.598 4.604v5.591z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h3 className="font-medium mb-4 text-white">Product</h3>
            <ul className="space-y-2">
              <li><a className="text-sm text-gray-400 hover:text-blue-400" href="#">Features</a></li>
              <li><a className="text-sm text-gray-400 hover:text-blue-400" href="#">Events</a></li>
              <li><a className="text-sm text-gray-400 hover:text-blue-400" href="#">Community</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              <li><a className="text-sm text-gray-400 hover:text-blue-400" href="#">About</a></li>
              <li><a className="text-sm text-gray-400 hover:text-blue-400" href="#">Careers</a></li>
              <li><a className="text-sm text-gray-400 hover:text-blue-400" href="#">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li><a className="text-sm text-gray-400 hover:text-blue-400" href="#">Blog</a></li>
              <li><a className="text-sm text-gray-400 hover:text-blue-400" href="#">Guides</a></li>
              <li><a className="text-sm text-gray-400 hover:text-blue-400" href="#">Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} CampusCompass. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a className="hover:text-blue-400" href="#">Terms</a>
            <a className="hover:text-blue-400" href="#">Privacy</a>
            <a className="hover:text-blue-400" href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
