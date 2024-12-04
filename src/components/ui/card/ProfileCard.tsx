import React, { useState } from "react";

const OnetSearch = () => {
    const [civilianData, setCivilianData] = useState({
        occupation: "",
        zipCode: "",
        city: "",
        state: ""
    });
    const [militaryData, setMilitaryData] = useState({
        militaryCode: "",
        branch: ""
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCivilianChange = (e) => {
        const { name, value } = e.target;
        setCivilianData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMilitaryChange = (e) => {
        const { name, value } = e.target;
        setMilitaryData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCivilianSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResults([]);

        try {
            const response = await fetch('/api/onet/civilian', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(civilianData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to fetch results');
            }

            const data = await response.json();
            setResults(data.occupations || []);
        } catch (err) {
            setError(err.message || "Failed to fetch results");
        } finally {
            setLoading(false);
        }
    };

    const handleMilitarySearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResults([]);

        try {
            const response = await fetch('/api/onet/military', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(militaryData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to fetch results');
            }

            const data = await response.json();
            setResults(data.occupations || []);
        } catch (err) {
            setError(err.message || "Failed to fetch results");
        } finally {
            setLoading(false);
        }
    };

    const handleSkillAssessment = () => {
        console.log("Starting skill assessment");
    };

    const states = [
        { value: "", label: "Select State" },
        { value: "AL", label: "Alabama" },
        // ... rest of states
    ];

    const branches = [
        { value: "", label: "Select Branch" },
        { value: "army", label: "Army" },
        { value: "navy", label: "Navy" },
        { value: "air_force", label: "Air Force" },
        { value: "marines", label: "Marine Corps" },
        { value: "coast_guard", label: "Coast Guard" },
        { value: "space_force", label: "Space Force" }
    ];

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="max-w-3xl mx-auto space-y-4">
                {/* Civilian Search Container */}
                <div className="bg-blue-950 p-6 rounded-lg shadow-md space-y-6">
                    {/* First Row: Occupation and ZIP */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label htmlFor="occupation" className="block mb-2 text-yellow-400">
                                Enter Occupation:
                            </label>
                            <input
                                type="text"
                                id="occupation"
                                name="occupation"
                                value={civilianData.occupation}
                                onChange={handleCivilianChange}
                                className="w-full p-2 rounded-md border border-yellow-400 bg-transparent text-yellow-400"
                                placeholder="Enter occupation keyword"
                            />
                        </div>

                        <div className="w-32">
                            <label htmlFor="zipCode" className="block mb-2 text-yellow-400">
                                ZIP:
                            </label>
                            <input
                                type="text"
                                id="zipCode"
                                name="zipCode"
                                value={civilianData.zipCode}
                                onChange={handleCivilianChange}
                                className="w-full p-2 rounded-md border border-yellow-400 bg-transparent text-yellow-400"
                                placeholder="ZIP code"
                                pattern="[0-9]{5}"
                                maxLength="5"
                            />
                        </div>
                    </div>

                    {/* Second Row: City, State, and Search */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label htmlFor="city" className="block mb-2 text-yellow-400">
                                City:
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={civilianData.city}
                                onChange={handleCivilianChange}
                                className="w-full p-2 rounded-md border border-yellow-400 bg-transparent text-yellow-400"
                                placeholder="Enter city"
                            />
                        </div>

                        <div className="w-48">
                            <label htmlFor="state" className="block mb-2 text-yellow-400">
                                State:
                            </label>
                            <select
                                id="state"
                                name="state"
                                value={civilianData.state}
                                onChange={handleCivilianChange}
                                className="w-full p-2 rounded-md border border-yellow-400 bg-transparent text-yellow-400"
                            >
                                {states.map(state => (
                                    <option key={state.value} value={state.value} className="bg-blue-950">
                                        {state.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={handleCivilianSearch}
                                className="w-24 bg-yellow-400 text-blue-950 font-bold py-2 rounded-md hover:bg-yellow-300"
                                disabled={loading}
                            >
                                {loading ? "..." : "Search"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Military Search Container */}
                <div className="bg-blue-950 p-6 rounded-lg shadow-md">
                    <div className="flex gap-4">
                        <div className="w-48">
                            <label htmlFor="militaryCode" className="block mb-2 text-yellow-400">
                                Military Code:
                            </label>
                            <input
                                type="text"
                                id="militaryCode"
                                name="militaryCode"
                                value={militaryData.militaryCode}
                                onChange={handleMilitaryChange}
                                className="w-full p-2 rounded-md border border-yellow-400 bg-transparent text-yellow-400"
                                placeholder="Enter code"
                            />
                        </div>

                        <div className="flex-1">
                            <label htmlFor="branch" className="block mb-2 text-yellow-400">
                                Branch:
                            </label>
                            <select
                                id="branch"
                                name="branch"
                                value={militaryData.branch}
                                onChange={handleMilitaryChange}
                                className="w-full p-2 rounded-md border border-yellow-400 bg-transparent text-yellow-400"
                            >
                                {branches.map(branch => (
                                    <option key={branch.value} value={branch.value} className="bg-blue-950">
                                        {branch.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={handleMilitarySearch}
                                className="w-24 bg-yellow-400 text-blue-950 font-bold py-2 rounded-md hover:bg-yellow-300"
                                disabled={loading}
                            >
                                {loading ? "..." : "Search"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Skill Assessment Container */}
                <div className="bg-blue-950 p-6 rounded-lg shadow-md flex justify-center">
                    <button
                        onClick={handleSkillAssessment}
                        className="bg-yellow-400 text-blue-950 font-bold py-3 px-6 rounded-md hover:bg-yellow-300 text-lg"
                    >
                        Skill Assessment
                    </button>
                </div>

                {/* Results Section */}
                {results.length > 0 && (
                    <div className="bg-blue-950 p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold text-yellow-400 mb-4">
                            Search Results
                        </h2>
                        {results.map((occupation, index) => (
                            <div
                                key={index}
                                className="border border-yellow-400 p-4 mb-4 rounded-md text-yellow-400"
                            >
                                <h3 className="font-bold">
                                    {occupation.code} - {occupation.title}
                                </h3>
                                {occupation.description && (
                                    <p className="text-sm mt-2 text-yellow-200">
                                        {occupation.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <p className="text-center text-yellow-400 bg-blue-950 p-4 rounded-md">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
};

export default OnetSearch;