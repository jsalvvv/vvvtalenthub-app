import React, { useState, useEffect } from "react";
import { TrendingUp, Building2, Users } from "lucide-react";
import onetService from "../../../utils/onetService";

const MarketAnalysisCard = () => {
    const [jobTitle, setJobTitle] = useState("");
    const [location, setLocation] = useState("");
    const [jobSuggestions, setJobSuggestions] = useState([]);
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [lmiData, setLmiData] = useState(null);
    const [onetData, setOnetData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const googleApiKey = process.env.GOOGLE_PLACES_API_KEY;
    const careerOneStopUserId = process.env.CAREERONESTOP_USER_ID;
    const careerOneStopApiKey = process.env.CAREERONESTOP_API_KEY;

    const handleSearch = async (e) => {
        e.preventDefault();
        setLmiData(null);
        setOnetData(null);
        setError("");
        setLoading(true);

        try {
            // First get O*NET data
            const onetResults = await onetService.searchKeyword(jobTitle);
            if (onetResults.occupation) {
                const occupationData = await onetService.getOccupationData(onetResults.occupation[0].code);
                setOnetData(occupationData);
            }

            // Then get CareerOneStop data
            const queryUrl = `https://api.careeronestop.org/v1/lmi/${careerOneStopUserId}/${encodeURIComponent(
                jobTitle
            )}/${encodeURIComponent(location)}`;

            const response = await fetch(queryUrl, {
                headers: {
                    Authorization: `Bearer ${careerOneStopApiKey}`,
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data from the API");
            }

            const data = await response.json();
            setLmiData(data);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Unable to fetch market information. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const fetchJobSuggestions = async (input) => {
        if (!input) {
            setJobSuggestions([]);
            return;
        }
        try {
            const results = await onetService.searchKeyword(input);
            if (results.occupation) {
                setJobSuggestions(results.occupation.map(occ => occ.title));
            } else {
                setJobSuggestions([]);
            }
        } catch (err) {
            console.error("Error fetching job suggestions:", err);
            setJobSuggestions([]);
        }
    };

    const fetchLocationSuggestions = async (input) => {
        if (!input) {
            setLocationSuggestions([]);
            return;
        }
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
            input
        )}&key=${googleApiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === "OK") {
                setLocationSuggestions(data.predictions.map((place) => place.description));
            } else {
                setLocationSuggestions([]);
            }
        } catch (err) {
            console.error("Error fetching location suggestions:", err);
            setLocationSuggestions([]);
        }
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (jobTitle) {
                fetchJobSuggestions(jobTitle);
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [jobTitle]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (location) {
                fetchLocationSuggestions(location);
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [location]);

    return (
        <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-white text-center">
                Labor Market Analysis
            </h1>

            <div className="bg-navy-800 p-4 rounded-lg shadow-md">
                <h4 className="text-amber-400 font-medium mb-4">Labor Market Search</h4>
                <form onSubmit={handleSearch} className="space-y-4">
                    <div>
                        <label htmlFor="jobTitle" className="block text-white mb-1">
                            Job Title:
                        </label>
                        <input
                            type="text"
                            id="jobTitle"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="w-full p-2 rounded-md border border-yellow-400 bg-transparent text-white"
                            placeholder="e.g., Financial Analyst"
                            list="job-suggestions"
                            autoComplete="off"
                            required
                        />
                        <datalist id="job-suggestions">
                            {jobSuggestions.map((suggestion, index) => (
                                <option key={index} value={suggestion} />
                            ))}
                        </datalist>
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-white mb-1">
                            Location:
                        </label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 rounded-md border border-yellow-400 bg-transparent text-white"
                            placeholder="e.g., San Diego, CA or 92101"
                            list="location-suggestions"
                            autoComplete="off"
                            required
                        />
                        <datalist id="location-suggestions">
                            {locationSuggestions.map((suggestion, index) => (
                                <option key={index} value={suggestion} />
                            ))}
                        </datalist>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-amber-400 text-navy-800 font-bold py-2 rounded-md hover:bg-amber-300"
                        disabled={loading}
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </form>
            </div>

            {error && (
                <p className="text-center text-white bg-navy-800 p-4 rounded-md">
                    {error}
                </p>
            )}

            {(lmiData || onetData) && (
                <div className="space-y-6">
                    {onetData && (
                        <div className="bg-navy-800 p-4 rounded-lg">
                            <h4 className="text-amber-400 font-medium mb-4">O*NET Data</h4>
                            <p className="text-gray-300">
                                {onetData.title || "No title available."}
                            </p>
                            <p className="text-lg font-medium text-white">
                                {onetData.description || "No description available."}
                            </p>
                        </div>
                    )}

                    {lmiData && (
                        <div className="bg-navy-800 p-4 rounded-lg">
                            <h4 className="text-amber-400 font-medium mb-4">Salary Insights</h4>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-3 bg-navy-700 rounded-lg">
                                    <p className="text-sm text-gray-300">State Average</p>
                                    <p className="text-lg font-medium text-white">
                                        ${lmiData.LMI?.AveragePay_State || "N/A"}
                                    </p>
                                </div>
                                <div className="p-3 bg-navy-700 rounded-lg">
                                    <p className="text-sm text-gray-300">National Average</p>
                                    <p className="text-lg font-medium text-white">
                                        ${lmiData.LMI?.AveragePay_National || "N/A"}
                                    </p>
                                </div>
                                <div className="p-3 bg-navy-700 rounded-lg">
                                    <p className="text-sm text-gray-300">Training Required</p>
                                    <p className="text-lg font-medium text-amber-400">
                                        {lmiData.LMI?.TypicalTraining || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {lmiData && (
                        <div className="bg-navy-800 p-4 rounded-lg">
                            <h4 className="text-amber-400 font-medium mb-4">Job Details</h4>
                            <p className="text-gray-300">
                                {lmiData.SocInfo?.SocDescription || "No description available."}
                            </p>
                        </div>
                    )}

                    {lmiData && (
                        <div className="bg-navy-800 p-4 rounded-lg">
                            <h4 className="text-amber-400 font-medium mb-4">Career Outlook</h4>
                            <p className="text-lg font-medium text-white">
                                {lmiData.LMI?.CareerOutLook || "N/A"}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MarketAnalysisCard;
