"use client";

import { useState } from "react";

type ProfileTab = "overview" | "merges" | "merge";

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

export default function Home() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set([0, 1]));
  const [showRawJson, setShowRawJson] = useState<Record<string, boolean>>({});
  const [searchText, setSearchText] = useState("");

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
    setActiveTab("overview");
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
              <h2 className="text-lg font-medium text-gray-900 mb-2">Lookup by ID</h2>
              <p className="text-sm text-gray-600 mb-4">
                Paste a flo360 ID, profile URL, or provider ID to go directly to a profile
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="e.g. 0Y4KrP3a43fZbBiL"
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
                        <div className="font-medium text-gray-900">Jordan Burroughs</div>
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
          <h1 className="text-xl font-semibold text-gray-900">{selectedProfile.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{selectedProfile.id}</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="flex gap-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-3 text-sm font-medium border-b-2 -mb-px ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-700 hover:text-gray-900"
              }`}
            >
              Overview & Edit
            </button>
            <button
              onClick={() => setActiveTab("merges")}
              className={`py-3 text-sm font-medium border-b-2 -mb-px ${
                activeTab === "merges"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-700 hover:text-gray-900"
              }`}
            >
              Active Merges
            </button>
            <button
              onClick={() => setActiveTab("merge")}
              className={`py-3 text-sm font-medium border-b-2 -mb-px ${
                activeTab === "merge"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-700 hover:text-gray-900"
              }`}
            >
              Merge New Profile
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <main className="px-6 py-6">
        <div className="max-w-6xl mx-auto">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
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

          {/* ACTIVE MERGES TAB */}
          {activeTab === "merges" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Active Merges</h2>
                <p className="text-sm text-gray-600 mb-6">2 profiles have been merged with {selectedProfile.name}</p>

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
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">DOB:</dt><dd className="text-gray-900">{selectedProfile.dob} (36 years)</dd></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">HS Grad Year:</dt><dd className="text-gray-900">{selectedProfile.hsGradYear} (20 years ago)</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Team:</dt><dd className="text-gray-900">{selectedProfile.team}</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Weight Class:</dt><dd className="text-gray-900">{selectedProfile.weightClass}</dd></div>
                            <div className="mt-2"><span className="text-gray-600 font-medium">Location</span></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">City, St, zip:</dt><dd className="text-gray-900">{selectedProfile.location}</dd></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">Lat/lng:</dt><dd className="text-gray-900">{selectedProfile.latLng}</dd></div>
                          </dl>
                          <button onClick={() => toggleJson("row0-jb")} className="mt-4 text-sm text-gray-500 hover:text-gray-700">
                            {showRawJson["row0-jb"] ? "▼ Hide raw JSON" : "▶ Show raw JSON"}
                          </button>
                          {showRawJson["row0-jb"] && (
                            <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-48 text-gray-800">
{JSON.stringify(selectedProfile, null, 2)}
                            </pre>
                          )}
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <dl className="space-y-2 text-sm">
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Name:</dt><dd className="text-gray-900">J. Burroughs</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Nickname:</dt><dd className="text-gray-900">—</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Gender:</dt><dd className="text-gray-900">Male</dd></div>
                            <div className="mt-2"><span className="text-gray-600 font-medium">Age</span></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">DOB:</dt><dd className="text-gray-900">1988-07-08 (36 years)</dd></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">HS Grad Year:</dt><dd className="text-gray-900">2006 (20 years ago)</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Team:</dt><dd className="text-gray-900">Nebraska Wrestling</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Weight Class:</dt><dd className="text-gray-900">163 lbs</dd></div>
                            <div className="mt-2"><span className="text-gray-600 font-medium">Location</span></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">City, St, zip:</dt><dd className="text-gray-900">Lincoln, NE 68508</dd></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">Lat/lng:</dt><dd className="text-gray-900">40.8258, -96.6852 (1.2 miles away)</dd></div>
                          </dl>
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
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">DOB:</dt><dd className="text-gray-900">{selectedProfile.dob} (36 years)</dd></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">HS Grad Year:</dt><dd className="text-gray-900">{selectedProfile.hsGradYear} (20 years ago)</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Team:</dt><dd className="text-gray-900">{selectedProfile.team}</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Weight Class:</dt><dd className="text-gray-900">{selectedProfile.weightClass}</dd></div>
                            <div className="mt-2"><span className="text-gray-600 font-medium">Location</span></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">City, St, zip:</dt><dd className="text-gray-900">{selectedProfile.location}</dd></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">Lat/lng:</dt><dd className="text-gray-900">{selectedProfile.latLng}</dd></div>
                          </dl>
                          <button onClick={() => toggleJson("row1-jb")} className="mt-4 text-sm text-gray-500 hover:text-gray-700">
                            {showRawJson["row1-jb"] ? "▼ Hide raw JSON" : "▶ Show raw JSON"}
                          </button>
                          {showRawJson["row1-jb"] && (
                            <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-48 text-gray-800">
{JSON.stringify(selectedProfile, null, 2)}
                            </pre>
                          )}
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <dl className="space-y-2 text-sm">
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Name:</dt><dd className="text-gray-900">Jordan E Burroughs</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Nickname:</dt><dd className="text-gray-900">JB</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Gender:</dt><dd className="text-gray-900">Male</dd></div>
                            <div className="mt-2"><span className="text-gray-600 font-medium">Age</span></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">DOB:</dt><dd className="text-gray-900">1988-07-08 (36 years)</dd></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">HS Grad Year:</dt><dd className="text-gray-900">2006 (20 years ago)</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Team:</dt><dd className="text-gray-900">USA Wrestling</dd></div>
                            <div className="flex"><dt className="w-28 text-gray-600 font-medium">Weight Class:</dt><dd className="text-gray-900">74 kg</dd></div>
                            <div className="mt-2"><span className="text-gray-600 font-medium">Location</span></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">City, St, zip:</dt><dd className="text-gray-900">Colorado Springs, CO 80909</dd></div>
                            <div className="flex ml-4"><dt className="w-24 text-gray-600">Lat/lng:</dt><dd className="text-gray-900">38.8339, -104.8214 (463 miles away)</dd></div>
                          </dl>
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
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* MERGE NEW PROFILE TAB */}
          {activeTab === "merge" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Merge with Another Profile</h2>
                <p className="text-sm text-gray-600 mb-4">Paste the flo360 ID of the profile you want to merge with {selectedProfile.name}</p>
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
                      <div className="flex ml-4"><dt className="w-24 text-gray-600">DOB:</dt><dd className="text-gray-900">{selectedProfile.dob} (36 years)</dd></div>
                      <div className="flex ml-4"><dt className="w-24 text-gray-600">HS Grad Year:</dt><dd className="text-gray-900">{selectedProfile.hsGradYear} (20 years ago)</dd></div>
                      <div className="flex"><dt className="w-28 text-gray-600 font-medium">Team:</dt><dd className="text-gray-900">{selectedProfile.team}</dd></div>
                      <div className="flex"><dt className="w-28 text-gray-600 font-medium">Weight Class:</dt><dd className="text-gray-900">{selectedProfile.weightClass}</dd></div>
                      <div className="mt-2"><span className="text-gray-600 font-medium">Location</span></div>
                      <div className="flex ml-4"><dt className="w-24 text-gray-600">City, St, zip:</dt><dd className="text-gray-900">{selectedProfile.location}</dd></div>
                      <div className="flex ml-4"><dt className="w-24 text-gray-600">Lat/lng:</dt><dd className="text-gray-900">{selectedProfile.latLng}</dd></div>
                    </dl>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <dl className="space-y-2 text-sm">
                      <div className="flex"><dt className="w-28 text-gray-600 font-medium">Name:</dt><dd className="text-gray-900">Jordan Williams</dd></div>
                      <div className="flex"><dt className="w-28 text-gray-600 font-medium">Nickname:</dt><dd className="text-gray-900">J-Will</dd></div>
                      <div className="flex"><dt className="w-28 text-gray-600 font-medium">Gender:</dt><dd className="text-gray-900">Male</dd></div>
                      <div className="mt-2"><span className="text-gray-600 font-medium">Age</span></div>
                      <div className="flex ml-4"><dt className="w-24 text-gray-600">DOB:</dt><dd className="text-gray-900">1995-03-22 (31 years)</dd></div>
                      <div className="flex ml-4"><dt className="w-24 text-gray-600">HS Grad Year:</dt><dd className="text-gray-900">2013 (13 years ago)</dd></div>
                      <div className="flex"><dt className="w-28 text-gray-600 font-medium">Team:</dt><dd className="text-gray-900">Iowa Wrestling</dd></div>
                      <div className="flex"><dt className="w-28 text-gray-600 font-medium">Weight Class:</dt><dd className="text-gray-900">86 kg</dd></div>
                      <div className="mt-2"><span className="text-gray-600 font-medium">Location</span></div>
                      <div className="flex ml-4"><dt className="w-24 text-gray-600">City, St, zip:</dt><dd className="text-gray-900">Iowa City, IA 52240</dd></div>
                      <div className="flex ml-4"><dt className="w-24 text-gray-600">Lat/lng:</dt><dd className="text-gray-900">41.6611, -91.5302 (268 miles away)</dd></div>
                    </dl>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    This will merge <strong>Jordan Williams</strong> into <strong>{selectedProfile.name}</strong>
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
        </div>
      </main>
    </div>
  );
}
