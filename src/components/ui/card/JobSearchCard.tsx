import React, { useState } from "react";

const OccupationSearchCard = () => {
    const [occupation, setOccupation] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        setResults(null);

        const userId = "q9kAeKb1Ygivqmp";
        const apiToken =
            "6r3wltWC/4bJqZGy/nZQuxGT4Q09QKYKh7P80VlbIhKZG84gtPhRcbHdmRKbIev76HMc3irkCijfIHIkEAPBfA==";

        try {
            const response = await fetch(
                `https://api.careeronestop.org/v1/occupation/${userId}/${encodeURIComponent(
                    occupation
                )}/true/1/10`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${apiToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            if (data && data.OccupationList && data.OccupationList.length > 0) {
                setResults(data.OccupationList);
            } else {
                setError(`No results found for "${occupation}" in ZIP code ${zipCode}.`);
            }
        } catch (err) {
            setError(`Failed to fetch results: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Selected Occupation Summary */}
            <div className="bg-navy-800 p-4 rounded-lg">
                <h4 className="text-yellow-400 font-medium mb-2">Selected Occupation</h4>
                <div className="text-gray-300 space-y-2">
                    <p className="font-medium text-lg">Financial Analyst</p>
                    <p className="text-sm">Selected from skills comparison</p>
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="selected-city" className="block text-white">
                                City
                            </label>
                            <input
                                type="text"
                                id="selected-city"
                                className="w-full p-2 rounded-md border border-gray-400 focus:ring-2 focus:ring-blue-300"
                                placeholder="e.g., San Diego"
                            />
                        </div>
                        <div>
                            <label htmlFor="selected-state" className="block text-white">
                                State
                            </label>
                            <input
                                type="text"
                                id="selected-state"
                                className="w-full p-2 rounded-md border border-gray-400 focus:ring-2 focus:ring-blue-300"
                                placeholder="e.g., CA"
                            />
                        </div>
                        <div>
                            <label htmlFor="selected-zip" className="block text-white">
                                ZIP Code <span className="text-red-500">(Required)</span>
                            </label>
                            <input
                                type="text"
                                id="selected-zip"
                                className="w-full p-2 rounded-md border border-gray-400 focus:ring-2 focus:ring-blue-300"
                                placeholder="e.g., 92101"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Occupation Search Form */}
            <div className="bg-navy-800 p-4 rounded-lg">
                <h2 className="text-white text-xl font-medium mb-4">Search Occupations</h2>
                <form onSubmit={handleSearch}>
                    <div className="mb-4">
                        <label htmlFor="occupation" className="block text-white">
                            Occupation
                        </label>
                        <input
                            type="text"
                            id="occupation"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            className="w-full p-2 rounded-md border border-gray-400 focus:ring-2 focus:ring-blue-300"
                            placeholder="e.g., Nurse"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="city" className="block text-white">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full p-2 rounded-md border border-gray-400 focus:ring-2 focus:ring-blue-300"
                            placeholder="e.g., Los Angeles"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="state" className="block text-white">
                            State
                        </label>
                        <input
                            type="text"
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full p-2 rounded-md border border-gray-400 focus:ring-2 focus:ring-blue-300"
                            placeholder="e.g., CA"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="zipCode" className="block text-white">
                            ZIP Code <span className="text-red-500">(Required)</span>
                        </label>
                        <input
                            type="text"
                            id="zipCode"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="w-full p-2 rounded-md border border-gray-400 focus:ring-2 focus:ring-blue-300"
                            placeholder="e.g., 90210"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-400 text-blue-900 font-bold py-2 rounded-lg hover:bg-yellow-300"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Results Section */}
            <div id="results" className="mt-4">
                {loading && (
                    <div className="bg-navy-800 p-4 rounded-lg">
                        <p className="text-yellow-400">Fetching results for "{occupation}" in ZIP code {zipCode}...</p>
                    </div>
                )}
                {error && (
                    <div className="bg-red-800 p-4 rounded-lg shadow-md">
                        <p className="text-white">{error}</p>
                    </div>
                )}
                {results &&
                    results.map((result, index) => (
                        <div
                            key={index}
                            className="bg-navy-800 p-4 rounded-lg"
                        >
                            <h4 className="text-yellow-400 font-medium">{result.OnetTitle}</h4>
                            <p className="text-gray-300">
                                <strong>Onet Code:</strong> {result.OnetCode}
                            </p>
                            <p className="text-gray-300">{result.OccupationDescription}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default OccupationSearchCard;
