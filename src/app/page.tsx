"use client";

import { useState } from "react";

type ProfileTab = "editFields" | "removeMerges" | "addMerge" | "removeEvents" | "addEvents";

interface Profile {
  id: string;
  name: string;
  nickname: string;
  gender: string;
  dob: string;
  hsGradYear: number;
  team: string;
  weightClass: string;
  location: string;
  latLng: string;
}

const JB_PROFILE_URL = "https://www.flowrestling.org/nextgen/people/11021385-jordan-burroughs?tab=home";

const jordanBurroughs: Profile = {
  id: "0Y4KrP3a43fZbBiL",
  name: "Jordan Burroughs",
  nickname: "JB",
  gender: "Male",
  dob: "1988-07-08",
  hsGradYear: 2006,
  team: "Sunkist Kids Wrestling Club",
  weightClass: "74 kg",
  location: "Philadelphia, PA",
  latLng: "41.2033216, -77.1945247",
};

interface Event {
  id: string;
  name: string;
  date: string;
  result: string;
  weightClass: string;
}

interface EventSource {
  profileId: string;
  profileName: string;
  isCurrent: boolean;
  events: Event[];
}

const eventsBySource: EventSource[] = [
  {
    profileId: "0Y4KrP3a43fZbBiL",
    profileName: "Jordan Burroughs",
    isCurrent: true,
    events: [
      { id: "e1", name: "2024 Olympic Trials", date: "2024-04-19", result: "Gold", weightClass: "74 kg" },
      { id: "e2", name: "2023 World Championships", date: "2023-09-20", result: "Gold", weightClass: "74 kg" },
      { id: "e3", name: "2023 Pan American Games", date: "2023-10-28", result: "Gold", weightClass: "74 kg" },
    ],
  },
  {
    profileId: "2Xk9mPqR7vNwYzA3",
    profileName: "J. Burroughs",
    isCurrent: false,
    events: [
      { id: "e4", name: "2022 Nebraska Open", date: "2022-03-12", result: "1st Place", weightClass: "163 lbs" },
      { id: "e5", name: "2021 Big Ten Championships", date: "2021-03-06", result: "1st Place", weightClass: "165 lbs" },
    ],
  },
  {
    profileId: "7HnTqW4pL9sRvXm2",
    profileName: "Jordan E Burroughs",
    isCurrent: false,
    events: [
      { id: "e6", name: "2020 US Open", date: "2020-04-25", result: "Gold", weightClass: "74 kg" },
      { id: "e7", name: "2019 World Championships", date: "2019-09-21", result: "Bronze", weightClass: "74 kg" },
      { id: "e8", name: "2018 World Cup", date: "2018-04-07", result: "Gold", weightClass: "74 kg" },
    ],
  },
];

export default function Home() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(jordanBurroughs);
  const [activeTab, setActiveTab] = useState<ProfileTab>("editFields");
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set([0, 1]));
  const [showRawJson, setShowRawJson] = useState<Record<string, boolean>>({});
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState<"internal" | "external">("internal");
  const [openDropdown, setOpenDropdown] = useState<"merges" | "events" | null>(null);

  const toggleRow = (index: number) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const toggleJson = (key: string) => {
    setShowRawJson(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const selectProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setActiveTab("editFields");
  };

  // SEARCH MODE
  if (!selectedProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl font-semibold text-gray-900">Athlete Profile Tool</h1>
          </div>
        </header>

        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* ID Lookup */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Lookup by ID or URL</h2>
              <ul className="text-sm text-gray-600 mb-4 list-disc list-inside space-y-1">
                <li>flo360 ID (e.g. <code className="bg-gray-100 px-1 rounded">0Y4KrP3a43fZbBiL</code>)</li>
                <li>Profile URL (e.g. <code className="bg-gray-100 px-1 rounded text-xs">flowrestling.org/nextgen/people/...</code>)</li>
                <li>Provider ID (e.g. Core, TrackWrestling)</li>
              </ul>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Paste ID or URL..."
                  className="flex-1 border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-900"
                />
                <button
                  onClick={() => selectProfile(jordanBurroughs)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Go
                </button>
              </div>
            </div>

            {/* Name Search */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Search by Name</h2>
              <p className="text-sm text-gray-600 mb-4">
                Find a profile by searching for an athlete's name
              </p>
              <input
                type="text"
                placeholder="Enter athlete name..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-900"
              />

              {/* Search Results */}
              {searchText.length > 0 && jordanBurroughs.name.toLowerCase().includes(searchText.toLowerCase()) && (
                <>
                  <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 mt-6">
                    <div
                      onClick={() => selectProfile(jordanBurroughs)}
                      className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium text-gray-900">
                          <a href={JB_PROFILE_URL} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:text-blue-600 hover:underline">Jordan Burroughs</a>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Sunkist Kids Wrestling Club · 74 kg · Philadelphia, PA</div>
                        <div className="text-xs text-gray-400 mt-1">0Y4KrP3a43fZbBiL</div>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View Profile →
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">1 result for "{searchText}"</p>
                </>
              )}

              {searchText.length > 0 && !jordanBurroughs.name.toLowerCase().includes(searchText.toLowerCase()) && (
                <p className="text-sm text-gray-500 mt-6">No results for "{searchText}"</p>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // PROFILE MODE
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Link */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setSelectedProfile(null)}
            className="text-sm text-blue-600 hover:text-blue-700 mb-2 flex items-center gap-1"
          >
            ← Back to Search
          </button>
          <h1 className="text-xl font-semibold text-gray-900">
            <a href={JB_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline">{selectedProfile.name}</a>
          </h1>
          <p className="text-sm text-gray-500 mt-1">{selectedProfile.id}</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="flex gap-6">
            {/* Edit Fields Tab */}
            <button
              onClick={() => { setActiveTab("editFields"); setOpenDropdown(null); }}
              className={`py-3 text-sm font-medium border-b-2 -mb-px ${
                activeTab === "editFields"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-700 hover:text-gray-900"
              }`}
            >
              Edit Fields
            </button>

            {/* Merges Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "merges" ? null : "merges")}
                className={`py-3 text-sm font-medium border-b-2 -mb-px flex items-center gap-1 ${
                  activeTab === "removeMerges" || activeTab === "addMerge"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-700 hover:text-gray-900"
                }`}
              >
                Merges
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === "merges" && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 min-w-[160px]">
                  <button
                    onClick={() => { setActiveTab("removeMerges"); setOpenDropdown(null); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Remove Existing
                  </button>
                  <button
                    onClick={() => { setActiveTab("addMerge"); setOpenDropdown(null); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Add New
                  </button>
                </div>
              )}
            </div>

            {/* Events Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "events" ? null : "events")}
                className={`py-3 text-sm font-medium border-b-2 -mb-px flex items-center gap-1 ${
                  activeTab === "removeEvents" || activeTab === "addEvents"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-700 hover:text-gray-900"
                }`}
              >
                Events
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === "events" && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 min-w-[160px]">
                  <button
                    onClick={() => { setActiveTab("removeEvents"); setOpenDropdown(null); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Remove Existing
                  </button>
                  <button
                    onClick={() => { setActiveTab("addEvents"); setOpenDropdown(null); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Add New
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <main className="px-6 py-6">
        <div className="max-w-6xl mx-auto">
          {/* EDIT FIELDS TAB */}
          {activeTab === "editFields" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Profile Details</h2>

              <form className="space-y-4 max-w-lg">
                {/* Photo Upload */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <span className="text-gray-600 text-2xl font-medium">JB</span>
                  </div>
                  <div>
                    <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Upload Photo
                    </button>
                    <p className="text-xs text-gray-600 mt-1">JPG or PNG, max 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">First Name</label>
                    <input type="text" defaultValue="Jordan" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Last Name</label>
                    <input type="text" defaultValue="Burroughs" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Nickname</label>
                  <input type="text" defaultValue="JB" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Gender</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Date of Birth</label>
                    <input type="date" defaultValue="1988-07-08" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">HS Grad Year</label>
                    <input type="number" defaultValue="2006" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Weight Class</label>
                    <input type="text" defaultValue="74 kg" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Team</label>
                  <input type="text" defaultValue="Sunkist Kids" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Location</label>
                  <input type="text" defaultValue="Lincoln, NE" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900" />
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => alert("Save clicked (mocked)")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* REMOVE MERGES TAB */}
          {activeTab === "removeMerges" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-lg font-medium text-gray-900">Active Merges</h2>
                  <div className="relative group">
                    <button
                      onClick={() => setViewMode(viewMode === "internal" ? "external" : "internal")}
                      className={`text-sm px-3 py-1 rounded-md font-medium ${
                        viewMode === "internal"
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      }`}
                    >
                      {viewMode === "internal" ? "View External" : "View Internal"}
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      External view hides PII (DOB, lat/lng) from users
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-6">2 profiles have been merged with <a href={JB_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{selectedProfile.name}</a></p>

                {/* Merged Profile 1 */}
                <div className="border border-gray-200 rounded-lg mb-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleRow(0)} className="text-gray-400 hover:text-gray-600">
                        {expandedRows.has(0) ? "▼" : "▶"}
                      </button>
                      <span className="font-medium text-gray-900">J. Burroughs</span>
                    </div>
                    <button className="text-sm text-red-600 hover:text-red-700 font-medium">Unmerge</button>
                  </div>

                  {expandedRows.has(0) && (
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-8 mb-3">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Current Profile</div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Merged Profile</div>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <dl className="space-y-2 text-sm">
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Name:</dt><dd className="text-gray-900">{selectedProfile.name}</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Nickname:</dt><dd className="text-gray-900">{selectedProfile.nickname}</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Gender:</dt><dd className="text-gray-900">{selectedProfile.gender}</dd></div>
                            <div className="mt-2"><span className="text-gray-600 font-medium">Age</span></div>
                            {viewMode === "internal" && (
                              <div className="flex ml-4"><dt className="w-24 text-gray-600">DOB:</dt><dd className="text-gray-900">{selectedProfile.dob} (36 years)</dd></div>
                            )}
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">HS Grad Year:</dt><dd className="text-gray-900">{selectedProfile.hsGradYear} (20 years ago)</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Team:</dt><dd className="text-gray-900">{selectedProfile.team}</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Weight Class:</dt><dd className="text-gray-900">{selectedProfile.weightClass}</dd></div>
                            <div className="mt-2"><span className="text-gray-600 font-medium">Location</span></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">City, St, zip:</dt><dd className="text-gray-900">{selectedProfile.location}</dd></div>
                            {viewMode === "internal" && (
                              <div className="flex ml-4"><dt className="w-24 text-gray-600">Lat/lng:</dt><dd className="text-gray-900">{selectedProfile.latLng}</dd></div>
                            )}
                          </dl>
                          {viewMode === "internal" && (
                            <>
                              <button onClick={() => toggleJson("row0-jb")} className="mt-4 text-sm text-gray-500 hover:text-gray-700">
                                {showRawJson["row0-jb"] ? "▼ Hide raw JSON" : "▶ Show raw JSON"}
                              </button>
                              {showRawJson["row0-jb"] && (
                                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-48 text-gray-800">
{JSON.stringify(selectedProfile, null, 2)}
                                </pre>
                              )}
                            </>
                          )}
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <dl className="space-y-2 text-sm">
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Name:</dt><dd className="text-gray-900">J. Burroughs</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Nickname:</dt><dd className="text-gray-900">—</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Gender:</dt><dd className="text-gray-900">Male</dd></div>
                            <div className="mt-2"><span className="text-gray-600 font-medium">Age</span></div>
                            {viewMode === "internal" && (
                              <div className="flex ml-4"><dt className="w-24 text-gray-600">DOB:</dt><dd className="text-gray-900">1988-07-08 (36 years)</dd></div>
                            )}
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">HS Grad Year:</dt><dd className="text-gray-900">2006 (20 years ago)</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Team:</dt><dd className="text-gray-900">Nebraska Wrestling</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Weight Class:</dt><dd className="text-gray-900">163 lbs</dd></div>
                            <div className="mt-2"><span className="text-gray-600 font-medium">Location</span></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">City, St, zip:</dt><dd className="text-gray-900">Lincoln, NE 68508</dd></div>
                            {viewMode === "internal" && (
                              <div className="flex ml-4"><dt className="w-24 text-gray-600">Lat/lng:</dt><dd className="text-gray-900">40.8258, -96.6852 (1.2 miles away)</dd></div>
                            )}
                          </dl>
                          {viewMode === "internal" && (
                            <>
                              <button onClick={() => toggleJson("row0-merged")} className="mt-4 text-sm text-gray-500 hover:text-gray-700">
                                {showRawJson["row0-merged"] ? "▼ Hide raw JSON" : "▶ Show raw JSON"}
                              </button>
                              {showRawJson["row0-merged"] && (
                                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-48 text-gray-800">
{JSON.stringify({
  id: "2Xk9mPqR7vNwYzA3",
  firstName: "J.",
  lastName: "Burroughs",
  nickname: null,
  gender: "male",
  dob: "1988-07-08",
  hsGradYear: 2006,
  team: "Nebraska Wrestling",
  weightClass: "163 lbs",
  location: { city: "Lincoln", state: "NE", zip: "68508", lat: 40.8258, lng: -96.6852 }
}, null, 2)}
                                </pre>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Merged Profile 2 */}
                <div className="border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleRow(1)} className="text-gray-400 hover:text-gray-600">
                        {expandedRows.has(1) ? "▼" : "▶"}
                      </button>
                      <span className="font-medium text-gray-900">Jordan E Burroughs</span>
                    </div>
                    <button className="text-sm text-red-600 hover:text-red-700 font-medium">Unmerge</button>
                  </div>

                  {expandedRows.has(1) && (
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-8 mb-3">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Current Profile</div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Merged Profile</div>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <dl className="space-y-2 text-sm">
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Name:</dt><dd className="text-gray-900">{selectedProfile.name}</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Nickname:</dt><dd className="text-gray-900">{selectedProfile.nickname}</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Gender:</dt><dd className="text-gray-900">{selectedProfile.gender}</dd></div>
                            <div className="mt-2"><span className="text-gray-600 font-medium">Age</span></div>
                            {viewMode === "internal" && (
                              <div className="flex ml-4"><dt className="w-24 text-gray-600">DOB:</dt><dd className="text-gray-900">{selectedProfile.dob} (36 years)</dd></div>
                            )}
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">HS Grad Year:</dt><dd className="text-gray-900">{selectedProfile.hsGradYear} (20 years ago)</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Team:</dt><dd className="text-gray-900">{selectedProfile.team}</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Weight Class:</dt><dd className="text-gray-900">{selectedProfile.weightClass}</dd></div>
                            <div className="mt-2"><span className="text-gray-600 font-medium">Location</span></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">City, St, zip:</dt><dd className="text-gray-900">{selectedProfile.location}</dd></div>
                            {viewMode === "internal" && (
                              <div className="flex ml-4"><dt className="w-24 text-gray-600">Lat/lng:</dt><dd className="text-gray-900">{selectedProfile.latLng}</dd></div>
                            )}
                          </dl>
                          {viewMode === "internal" && (
                            <>
                              <button onClick={() => toggleJson("row1-jb")} className="mt-4 text-sm text-gray-500 hover:text-gray-700">
                                {showRawJson["row1-jb"] ? "▼ Hide raw JSON" : "▶ Show raw JSON"}
                              </button>
                              {showRawJson["row1-jb"] && (
                                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-48 text-gray-800">
{JSON.stringify(selectedProfile, null, 2)}
                                </pre>
                              )}
                            </>
                          )}
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <dl className="space-y-2 text-sm">
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Name:</dt><dd className="text-gray-900">Jordan E Burroughs</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Nickname:</dt><dd className="text-gray-900">JB</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Gender:</dt><dd className="text-gray-900">Male</dd></div>
                            <div className="mt-2"><span className="text-gray-600 font-medium">Age</span></div>
                            {viewMode === "internal" && (
                              <div className="flex ml-4"><dt className="w-24 text-gray-600">DOB:</dt><dd className="text-gray-900">1988-07-08 (36 years)</dd></div>
                            )}
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">HS Grad Year:</dt><dd className="text-gray-900">2006 (20 years ago)</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Team:</dt><dd className="text-gray-900">USA Wrestling</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Weight Class:</dt><dd className="text-gray-900">74 kg</dd></div>
                            <div className="mt-2"><span className="text-gray-600 font-medium">Location</span></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">City, St, zip:</dt><dd className="text-gray-900">Colorado Springs, CO 80909</dd></div>
                            {viewMode === "internal" && (
                              <div className="flex ml-4"><dt className="w-24 text-gray-600">Lat/lng:</dt><dd className="text-gray-900">38.8339, -104.8214 (463 miles away)</dd></div>
                            )}
                          </dl>
                          {viewMode === "internal" && (
                            <>
                              <button onClick={() => toggleJson("row1-merged")} className="mt-4 text-sm text-gray-500 hover:text-gray-700">
                                {showRawJson["row1-merged"] ? "▼ Hide raw JSON" : "▶ Show raw JSON"}
                              </button>
                              {showRawJson["row1-merged"] && (
                                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-48 text-gray-800">
{JSON.stringify({
  id: "7HnTqW4pL9sRvXm2",
  firstName: "Jordan",
  middleInitial: "E",
  lastName: "Burroughs",
  nickname: "JB",
  gender: "male",
  dob: "1988-07-08",
  hsGradYear: 2006,
  team: "USA Wrestling",
  weightClass: "74 kg",
  location: { city: "Colorado Springs", state: "CO", zip: "80909", lat: 38.8339, lng: -104.8214 }
}, null, 2)}
                                </pre>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ADD MERGE TAB */}
          {activeTab === "addMerge" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-lg font-medium text-gray-900">Merge with Another Profile</h2>
                  <div className="relative group">
                    <button
                      onClick={() => setViewMode(viewMode === "internal" ? "external" : "internal")}
                      className={`text-sm px-3 py-1 rounded-md font-medium ${
                        viewMode === "internal"
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      }`}
                    >
                      {viewMode === "internal" ? "View External" : "View Internal"}
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      External view hides PII (DOB, lat/lng) from users
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">Paste the flo360 ID of the profile you want to merge with <a href={JB_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{selectedProfile.name}</a></p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="e.g. 0Y4KrP3a43fZbBiL"
                    defaultValue=""
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    Load Profile
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Comparison</h2>
                <div className="grid grid-cols-2 gap-8 mb-3">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Current Profile</div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Profile to Merge</div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <dl className="space-y-2 text-sm">
                      <div className="flex"><dt className="w-28 text-gray-600 font-medium">Name:</dt><dd className="text-gray-900">{selectedProfile.name}</dd></div>
                      <div className="flex"><dt className="w-28 text-gray-600 font-medium">Nickname:</dt><dd className="text-gray-900">{selectedProfile.nickname}</dd></div>
                      <div className="flex"><dt className="w-28 text-gray-600 font-medium">Gender:</dt><dd className="text-gray-900">{selectedProfile.gender}</dd></div>
                      <div className="mt-2"><span className="text-gray-600 font-medium">Age</span></div>
                      {viewMode === "internal" && (
                        <div className="flex ml-4"><dt className="w-24 text-gray-600">DOB:</dt><dd className="text-gray-900">{selectedProfile.dob} (36 years)</dd></div>
                      )}
                      <div className="flex ml-4"><dt className="w-24 text-gray-600">HS Grad Year:</dt><dd className="text-gray-900">{selectedProfile.hsGradYear} (20 years ago)</dd></div>
                      <div className="flex"><dt className="w-28 text-gray-600 font-medium">Team:</dt><dd className="text-gray-900">{selectedProfile.team}</dd></div>
                      <div className="flex"><dt className="w-28 text-gray-600 font-medium">Weight Class:</dt><dd className="text-gray-900">{selectedProfile.weightClass}</dd></div>
                      <div className="mt-2"><span className="text-gray-600 font-medium">Location</span></div>
                      <div className="flex ml-4"><dt className="w-24 text-gray-600">City, St, zip:</dt><dd className="text-gray-900">{selectedProfile.location}</dd></div>
                      {viewMode === "internal" && (
                        <div className="flex ml-4"><dt className="w-24 text-gray-600">Lat/lng:</dt><dd className="text-gray-900">{selectedProfile.latLng}</dd></div>
                      )}
                    </dl>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <dl className="space-y-2 text-sm">
                      <div className="flex"><dt className="w-28 text-gray-600 font-medium">Name:</dt><dd className="text-gray-900">Jordan Williams</dd></div>
                      <div className="flex"><dt className="w-28 text-gray-600 font-medium">Nickname:</dt><dd className="text-gray-900">J-Will</dd></div>
                      <div className="flex"><dt className="w-28 text-gray-600 font-medium">Gender:</dt><dd className="text-gray-900">Male</dd></div>
                      <div className="mt-2"><span className="text-gray-600 font-medium">Age</span></div>
                      {viewMode === "internal" && (
                        <div className="flex ml-4"><dt className="w-24 text-gray-600">DOB:</dt><dd className="text-gray-900">1995-03-22 (31 years)</dd></div>
                      )}
                      <div className="flex ml-4"><dt className="w-24 text-gray-600">HS Grad Year:</dt><dd className="text-gray-900">2013 (13 years ago)</dd></div>
                      <div className="flex"><dt className="w-28 text-gray-600 font-medium">Team:</dt><dd className="text-gray-900">Iowa Wrestling</dd></div>
                      <div className="flex"><dt className="w-28 text-gray-600 font-medium">Weight Class:</dt><dd className="text-gray-900">86 kg</dd></div>
                      <div className="mt-2"><span className="text-gray-600 font-medium">Location</span></div>
                      <div className="flex ml-4"><dt className="w-24 text-gray-600">City, St, zip:</dt><dd className="text-gray-900">Iowa City, IA 52240</dd></div>
                      {viewMode === "internal" && (
                        <div className="flex ml-4"><dt className="w-24 text-gray-600">Lat/lng:</dt><dd className="text-gray-900">41.6611, -91.5302 (268 miles away)</dd></div>
                      )}
                    </dl>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    This will merge <strong>Jordan Williams</strong> into <a href={JB_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">{selectedProfile.name}</a>
                  </p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                      Cancel
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                      Merge Profiles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REMOVE EVENTS TAB */}
          {activeTab === "removeEvents" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Events on this Profile</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Events are grouped by where they came from. If you see events from a merged profile that don't belong, consider unmerging that profile instead of removing individual events.
                </p>

                <div className="space-y-6">
                  {eventsBySource.map((source) => (
                    <div key={source.profileId} className="border border-gray-200 rounded-lg">
                      {/* Source header */}
                      <div className={`flex items-center justify-between p-4 ${source.isCurrent ? 'bg-blue-50 border-b border-blue-100' : 'bg-gray-50 border-b border-gray-200'}`}>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{source.profileName}</span>
                            {source.isCurrent ? (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Current Profile</span>
                            ) : (
                              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">Merged</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{source.events.length} events</div>
                        </div>
                        {!source.isCurrent && (
                          <button className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                            ⚠️ Unmerge this profile
                          </button>
                        )}
                      </div>

                      {/* Events list */}
                      <div className="divide-y divide-gray-100">
                        {source.events.map((event) => (
                          <div key={event.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                            <div>
                              <div className="font-medium text-gray-900">{event.name}</div>
                              <div className="text-sm text-gray-600 mt-1">
                                {event.date} · {event.result} · {event.weightClass}
                              </div>
                            </div>
                            <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ADD EVENTS TAB */}
          {activeTab === "addEvents" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Add Events to this Profile</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Paste an event URL to find participants and add them to this profile.
                </p>

                {/* Event URL Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Event URL</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="e.g. flowrestling.org/events/12345-ncaa-championships"
                      className="flex-1 border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-900"
                    />
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-blue-700">
                      Load Event
                    </button>
                  </div>
                </div>
              </div>

              {/* Loaded Event */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-gray-900">2024 NCAA Championships</h2>
                  <p className="text-sm text-gray-600 mt-1">March 21-23, 2024 · Kansas City, MO</p>
                </div>

                <h3 className="text-sm font-medium text-gray-900 mb-2">Select Participant</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Choose which participant from this event should be added to <span className="font-medium">{selectedProfile?.name}</span>'s profile.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> Participant identification in events is still being designed.
                    Internal users will see participant IDs. External user experience TBD.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                  <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div>
                      <div className="font-medium text-gray-900">J. Burroughs</div>
                      <div className="text-sm text-gray-600 mt-1">74 kg · 1st Place</div>
                      <div className="text-xs text-gray-400 mt-1">participant_8472</div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                      Add to Profile
                    </button>
                  </div>
                  <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div>
                      <div className="font-medium text-gray-900">Marcus Thompson</div>
                      <div className="text-sm text-gray-600 mt-1">74 kg · 2nd Place</div>
                      <div className="text-xs text-gray-400 mt-1">participant_8519</div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                      Add to Profile
                    </button>
                  </div>
                  <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div>
                      <div className="font-medium text-gray-900">Tyler Rodriguez</div>
                      <div className="text-sm text-gray-600 mt-1">74 kg · 3rd Place</div>
                      <div className="text-xs text-gray-400 mt-1">participant_8533</div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                      Add to Profile
                    </button>
                  </div>
                  <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div>
                      <div className="font-medium text-gray-900">David Kim</div>
                      <div className="text-sm text-gray-600 mt-1">74 kg · 4th Place</div>
                      <div className="text-xs text-gray-400 mt-1">participant_8547</div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                      Add to Profile
                    </button>
                  </div>
                  <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div>
                      <div className="font-medium text-gray-900">Chris Martinez</div>
                      <div className="text-sm text-gray-600 mt-1">74 kg · 5th Place</div>
                      <div className="text-xs text-gray-400 mt-1">participant_8561</div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                      Add to Profile
                    </button>
                  </div>
                  <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div>
                      <div className="font-medium text-gray-900">Alex Johnson</div>
                      <div className="text-sm text-gray-600 mt-1">74 kg · 6th Place</div>
                      <div className="text-xs text-gray-400 mt-1">participant_8578</div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                      Add to Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
