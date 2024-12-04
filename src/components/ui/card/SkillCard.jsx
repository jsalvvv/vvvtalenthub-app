import React, { useState } from 'react';

// Replace these with your actual credentials
const API_TOKEN = 'YOUR_API_TOKEN';
const USER_ID = 'YOUR_USER_ID';
const questions = [
    {
        question: "How comfortable are you with HTML?",
        options: [
            "Beginner: Can create a simple webpage",
            "Intermediate: Can use forms and tables",
            "Advanced: Can implement semantic HTML",
            "Expert: Can optimize for accessibility"
        ]
    },
    {
        question: "How skilled are you with CSS?",
        options: [
            "Beginner: Can style text and background",
            "Intermediate: Can use Flexbox",
            "Advanced: Can create responsive designs",
            "Expert: Can build complex animations"
        ]
    },
    {
        question: "What's your proficiency in JavaScript?",
        options: [
            "Beginner: Can write basic scripts",
            "Intermediate: Can use functions and events",
            "Advanced: Can work with APIs",
            "Expert: Can build full applications"
        ]
    },
    {
        question: "How familiar are you with jQuery?",
        options: [
            "Beginner: Can use selectors",
            "Intermediate: Can manipulate the DOM",
            "Advanced: Can use AJAX calls",
            "Expert: Can create plugins"
        ]
    },
    {
        question: "How well do you understand Bootstrap?",
        options: [
            "Beginner: Can use grid system",
            "Intermediate: Can customize components",
            "Advanced: Can create layouts",
            "Expert: Can contribute to Bootstrap"
        ]
    },
    {
        question: "How experienced are you with PHP?",
        options: [
            "Beginner: Can write simple scripts",
            "Intermediate: Can use loops and functions",
            "Advanced: Can manage sessions",
            "Expert: Can build frameworks"
        ]
    },
    {
        question: "What's your comfort level with Python?",
        options: [
            "Beginner: Can write basic code",
            "Intermediate: Can use libraries",
            "Advanced: Can develop web applications",
            "Expert: Can contribute to open-source projects"
        ]
    },
    {
        question: "How skilled are you with SQL?",
        options: [
            "Beginner: Can write SELECT queries",
            "Intermediate: Can join tables",
            "Advanced: Can optimize queries",
            "Expert: Can design databases"
        ]
    },
    {
        question: "How proficient are you with C#?",
        options: [
            "Beginner: Can write simple programs",
            "Intermediate: Can use classes and objects",
            "Advanced: Can build desktop applications",
            "Expert: Can optimize for performance"
        ]
    },
    {
        question: "How well do you know C++?",
        options: [
            "Beginner: Can write basic code",
            "Intermediate: Can use pointers",
            "Advanced: Can manage memory",
            "Expert: Can implement complex algorithms"
        ]
    },
    {
        question: "How comfortable are you with Ruby?",
        options: [
            "Beginner: Can write basic Ruby scripts",
            "Intermediate: Can use Ruby gems",
            "Advanced: Can develop with Rails",
            "Expert: Can contribute to Ruby libraries"
        ]
    },
    {
        question: "How skilled are you with Java?",
        options: [
            "Beginner: Can write simple Java programs",
            "Intermediate: Can use collections and threads",
            "Advanced: Can develop Android apps",
            "Expert: Can optimize JVM performance"
        ]
    },
    {
        question: "What's your experience with Swift?",
        options: [
            "Beginner: Can write basic apps",
            "Intermediate: Can use UIKit",
            "Advanced: Can manage Core Data",
            "Expert: Can build complex iOS applications"
        ]
    },
    {
        question: "How familiar are you with Kotlin?",
        options: [
            "Beginner: Can write basic Kotlin code",
            "Intermediate: Can use Android SDK",
            "Advanced: Can integrate with Java",
            "Expert: Can write Kotlin DSLs"
        ]
    },
    {
        question: "How proficient are you with R?",
        options: [
            "Beginner: Can perform basic data analysis",
            "Intermediate: Can use tidyverse",
            "Advanced: Can build statistical models",
            "Expert: Can develop R packages"
        ]
    },
    {
        question: "How skilled are you with MATLAB?",
        options: [
            "Beginner: Can write basic scripts",
            "Intermediate: Can plot data",
            "Advanced: Can perform matrix operations",
            "Expert: Can develop toolboxes"
        ]
    },
    {
        question: "What's your comfort level with Go?",
        options: [
            "Beginner: Can write basic programs",
            "Intermediate: Can handle concurrency",
            "Advanced: Can develop web services",
            "Expert: Can contribute to Go projects"
        ]
    },
    {
        question: "How experienced are you with Scala?",
        options: [
            "Beginner: Can write simple Scala code",
            "Intermediate: Can use Akka",
            "Advanced: Can work with Spark",
            "Expert: Can build scalable applications"
        ]
    },
    {
        question: "How familiar are you with Rust?",
        options: [
            "Beginner: Can write basic Rust programs",
            "Intermediate: Can manage ownership",
            "Advanced: Can use Rust's concurrency model",
            "Expert: Can contribute to Rust libraries"
        ]
    },
    {
        question: "How proficient are you with Dart?",
        options: [
            "Beginner: Can write simple scripts",
            "Intermediate: Can develop with Flutter",
            "Advanced: Can optimize layouts",
            "Expert: Can build complex applications"
        ]
    },
    {
        question: "What is your proficiency in JavaScript frameworks?",
        options: [
            "Beginner: Can write basic loops",
            "Intermediate: Can manipulate the DOM",
            "Advanced: Can build single-page applications",
            "Expert: Can optimize performance in complex applications"
        ]
    },
    {
        question: "How well do you understand CSS Flexbox?",
        options: [
            "Beginner: Can create simple layouts",
            "Intermediate: Can handle responsive design",
            "Advanced: Can manage complex alignment issues",
            "Expert: Can teach others about Flexbox"
        ]
    },
    {
        question: "What's your level of experience with Node.js?",
        options: [
            "Beginner: Can run a basic server",
            "Intermediate: Can integrate with databases",
            "Advanced: Can manage asynchronous operations",
            "Expert: Can build large-scale applications"
        ]
    },
    {
        question: "How proficient are you with Python libraries?",
        options: [
            "Beginner: Can use basic libraries",
            "Intermediate: Can utilize data analysis libraries",
            "Advanced: Can develop with machine learning libraries",
            "Expert: Can contribute to open-source libraries"
        ]
    },
    {
        question: "How well do you know HTML5 semantics?",
        options: [
            "Beginner: Can structure a basic page",
            "Intermediate: Can use semantic tags effectively",
            "Advanced: Can optimize for accessibility",
            "Expert: Can implement SEO best practices"
        ]
    },
    {
        question: "How skilled are you with SQL databases?",
        options: [
            "Beginner: Can write simple SELECT queries",
            "Intermediate: Can join multiple tables",
            "Advanced: Can design a normalized database schema",
            "Expert: Can optimize complex queries"
        ]
    },
    {
        question: "What's your experience with RESTful APIs?",
        options: [
            "Beginner: Can consume APIs",
            "Intermediate: Can build basic endpoints",
            "Advanced: Can design scalable APIs",
            "Expert: Can implement API versioning"
        ]
    },
    {
        question: "How well do you understand object-oriented programming?",
        options: [
            "Beginner: Can create simple classes",
            "Intermediate: Can utilize inheritance",
            "Advanced: Can design patterns",
            "Expert: Can refactor complex systems"
        ]
    },
    {
        question: "What's your proficiency in version control using Git?",
        options: [
            "Beginner: Can clone and commit",
            "Intermediate: Can handle branches",
            "Advanced: Can resolve merge conflicts",
            "Expert: Can manage large-scale projects"
        ]
    },
    {
        question: "How familiar are you with cloud services like AWS?",
        options: [
            "Beginner: Can set up basic instances",
            "Intermediate: Can manage storage and databases",
            "Advanced: Can design cost-efficient architectures",
            "Expert: Can implement security best practices"
        ]
    },
    {
        question: "How familiar are you with design patterns?",
        options: [
            "Beginner: Can recognize basic patterns",
            "Intermediate: Can apply patterns in projects",
            "Advanced: Can refactor code using patterns",
            "Expert: Can create custom patterns"
        ]
    },
    {
        question: "What's your proficiency in React.js?",
        options: [
            "Beginner: Can create components",
            "Intermediate: Can manage state using hooks",
            "Advanced: Can optimize performance",
            "Expert: Can build scalable applications"
        ]
    },
    {
        question: "How skilled are you with TypeScript?",
        options: [
            "Beginner: Can type basic variables",
            "Intermediate: Can create interfaces and types",
            "Advanced: Can implement generics",
            "Expert: Can contribute to TypeScript definitions"
        ]
    },
    {
        question: "What's your experience with Agile methodologies?",
        options: [
            "Beginner: Can participate in sprints",
            "Intermediate: Can manage tasks with Kanban",
            "Advanced: Can lead scrum meetings",
            "Expert: Can implement Agile practices across teams"
        ]
    },
    {
        question: "How familiar are you with DevOps practices?",
        options: [
            "Beginner: Can use basic CI/CD tools",
            "Intermediate: Can automate deployments",
            "Advanced: Can manage cloud infrastructure",
            "Expert: Can design full DevOps pipelines"
        ]
    },
    {
        question: "How proficient are you with mobile app development?",
        options: [
            "Beginner: Can create simple apps",
            "Intermediate: Can use cross-platform tools",
            "Advanced: Can optimize for performance",
            "Expert: Can publish to app stores"
        ]
    },
    {
        question: "How well do you know cybersecurity principles?",
        options: [
            "Beginner: Can follow basic security protocols",
            "Intermediate: Can conduct security audits",
            "Advanced: Can implement encryption",
            "Expert: Can design secure systems"
        ]
    },
    {
        question: "How skilled are you with AI and machine learning?",
        options: [
            "Beginner: Can use pre-trained models",
            "Intermediate: Can train simple models",
            "Advanced: Can optimize algorithms",
            "Expert: Can develop new models"
        ]
    },
    {
        question: "What's your experience with blockchain technology?",
        options: [
            "Beginner: Can understand basic concepts",
            "Intermediate: Can develop smart contracts",
            "Advanced: Can integrate blockchain with applications",
            "Expert: Can innovate with blockchain technology"
        ]
    },
    {
        question: "How familiar are you with serverless architecture?",
        options: [
            "Beginner: Can deploy simple functions",
            "Intermediate: Can manage stateful services",
            "Advanced: Can optimize for cost and performance",
            "Expert: Can design enterprise-level serverless solutions"
        ]
    }
];

const SkillAssessment = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [showCongrats, setShowCongrats] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);

    const progressWidth = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleNext = () => {
        if (!answers[currentQuestionIndex]) {
            setErrorMessage('Please select an answer before proceeding.');
            return;
        }

        if (isLastQuestion) {
            if (answers.includes(null)) {
                const firstUnanswered = answers.indexOf(null) + 1;
                setErrorMessage(`Please answer Question ${firstUnanswered} before submitting.`);
            } else {
                setShowCongrats(true);
                setErrorMessage('');
            }
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
            setErrorMessage('');
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            setErrorMessage('');
        }
    };

    const handleAnswerSelect = (optionIndex) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = optionIndex;
        setAnswers(newAnswers);
        setErrorMessage('');
    };

    const currentQuestion = questions[currentQuestionIndex];
    
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* ... previous UI elements ... */}

            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg">
                        <p className="text-lg">Processing your skills assessment...</p>
                    </div>
                </div>
            )}

            {apiResponse && (
                <div className="mt-8 border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4">Matching Occupations</h3>
                    <div className="space-y-4">
                        {apiResponse.SKARankList.map((occupation, index) => (
                            <div key={occupation.OnetCode} className="p-4 border rounded-lg">
                                <h4 className="font-semibold">{occupation.OccupationTitle}</h4>
                                <p className="text-sm text-gray-600">
                                    Match Score: {(occupation.Score * 100).toFixed(1)}%
                                </p>
                                <p className="text-sm">
                                    Typical Education: {occupation.TypicalEducation}
                                </p>
                                <p className="text-sm">
                                    Annual Wages: ${occupation.AnnualWages.toLocaleString()}
                                </p>
                                <p className="text-sm">
                                    Outlook: {occupation.Outlook}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {errorMessage && (
                <div className="text-red-500 mb-4">
                    {errorMessage}
                </div>
            )}

            <div className="flex justify-between mt-6">
                <button
                    onClick={handleBack}
                    disabled={currentQuestionIndex === 0}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Back
                </button>
                <button
                    onClick={handleNext}
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLastQuestion ? 'Submit' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default SkillAssessment;