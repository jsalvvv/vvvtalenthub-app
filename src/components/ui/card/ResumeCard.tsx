import React, { useReducer, useState } from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter
} from "./card"
import Alert from "../alert"
import { Button } from "../button"
import { Label } from "../label"
import { Textarea } from "../textarea"
import { Input } from "../input"
import { Loader2 } from 'lucide-react'
import { cn } from "../../../utils/utils"

const initialState = {
    name: '',
    jobTitle: '',
    skills: '',
    experience: '',
    branch: '',
    code: '',
    aiAnalysis: null
}

const resumeReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return { ...state, [action.field]: action.value }
        case 'SET_AI_ANALYSIS':
            return { ...state, aiAnalysis: action.analysis }
        case 'RESET_FORM':
            return initialState
        default:
            return state
    }
}

const ResumeCard = () => {
    const [isVeteran, setIsVeteran] = useState(false)
    const [state, dispatch] = useReducer(resumeReducer, initialState)
    const [showResult, setShowResult] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleInputChange = (field) => (e) => {
        dispatch({
            type: 'UPDATE_FIELD',
            field,
            value: e.target.value
        })
    }

    const validateForm = () => {
        if (!state.name.trim()) {
            setError('Please enter your name')
            return false
        }
        if (!isVeteran && !state.jobTitle.trim()) {
            setError('Please enter your desired job title')
            return false
        }
        if (!state.skills.trim()) {
            setError('Please enter your skills')
            return false
        }
        if (!state.experience.trim()) {
            setError('Please enter your experience')
            return false
        }
        if (isVeteran) {
            if (!state.branch.trim()) {
                setError('Please enter your military branch')
                return false
            }
            if (!state.code.trim()) {
                setError('Please enter your military code/MOS')
                return false
            }
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!validateForm()) {
            return
        }

        setIsLoading(true)
        setShowResult(false)

        try {
            const prompt = isVeteran ?
                `Please analyze this veteran's experience and suggest civilian equivalents:
         Branch: ${state.branch}
         Military Code: ${state.code}
         Experience: ${state.experience}
         Current Skills: ${state.skills}` :
                `Please analyze this resume and suggest improvements:
         Name: ${state.name}
         Job Title: ${state.jobTitle}
         Experience: ${state.experience}
         Skills: ${state.skills}`

            const response = await fetch('/api/analyze-resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ prompt, isVeteran })
            })

            if (!response.ok) {
                throw new Error('Failed to analyze resume. Please try again.')
            }

            const data = await response.json()

            if (!data || (isVeteran && !data.civilianEquivalents) || (!isVeteran && !data.suggestions)) {
                throw new Error('Invalid response from AI analysis')
            }

            dispatch({ type: 'SET_AI_ANALYSIS', analysis: data })
            setShowResult(true)
        } catch (err) {
            setError(err.message || 'An error occurred while analyzing your resume')
        } finally {
            setIsLoading(false)
        }
    }

    const renderAnalysis = () => {
        if (!state.aiAnalysis) return null;

        return (
            <div className="mt-8 space-y-4 bg-muted p-6 rounded-lg">
                <h3 className="text-xl font-semibold">Analysis Results</h3>
                {isVeteran ? (
                    <>
                        <div className="space-y-2">
                            <h4 className="font-medium">Civilian Equivalents:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                {state.aiAnalysis.civilianEquivalents?.map((item, index) => (
                                    <li key={index} className="text-sm">{item}</li>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="space-y-2">
                            <h4 className="font-medium">Suggestions for Improvement:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                {state.aiAnalysis.suggestions?.map((item, index) => (
                                    <li key={index} className="text-sm">{item}</li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        )
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle className="text-2xl font-bold">
                            {isVeteran ? 'Veteran Resume Analysis' : 'Resume Builder'}
                        </CardTitle>
                        <CardDescription>
                            {isVeteran
                                ? 'Get help translating your military experience into civilian terms'
                                : 'Get AI-powered suggestions to improve your resume'}
                        </CardDescription>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setIsVeteran(!isVeteran)
                            dispatch({ type: 'RESET_FORM' })
                            setShowResult(false)
                            setError(null)
                        }}
                    >
                        Switch to {isVeteran ? 'Civilian' : 'Veteran'} Resume
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={state.name}
                                onChange={handleInputChange('name')}
                                placeholder="Enter your full name"
                                className={cn(error && !state.name.trim() && "border-red-500")}
                                required
                            />
                        </div>

                        {!isVeteran && (
                            <div className="space-y-2">
                                <Label htmlFor="jobTitle">Desired Job Title</Label>
                                <Input
                                    id="jobTitle"
                                    type="text"
                                    value={state.jobTitle}
                                    onChange={handleInputChange('jobTitle')}
                                    placeholder="e.g. Software Engineer"
                                    className={cn(error && !state.jobTitle.trim() && "border-red-500")}
                                    required
                                />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="skills">Skills</Label>
                        <Textarea
                            id="skills"
                            value={state.skills}
                            onChange={handleInputChange('skills')}
                            placeholder="List your key skills, separated by commas"
                            className={cn(error && !state.skills.trim() && "border-red-500")}
                            rows={4}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="experience">Experience</Label>
                        <Textarea
                            id="experience"
                            value={state.experience}
                            onChange={handleInputChange('experience')}
                            placeholder={isVeteran ? "Describe your military experience" : "Describe your work experience"}
                            className={cn(error && !state.experience.trim() && "border-red-500")}
                            rows={4}
                            required
                        />
                    </div>

                    {isVeteran && (
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="branch">Military Branch</Label>
                                <Input
                                    id="branch"
                                    type="text"
                                    value={state.branch}
                                    onChange={handleInputChange('branch')}
                                    placeholder="e.g. Army, Navy, Air Force"
                                    className={cn(error && !state.branch.trim() && "border-red-500")}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="code">Military Code/MOS</Label>
                                <Input
                                    id="code"
                                    type="text"
                                    value={state.code}
                                    onChange={handleInputChange('code')}
                                    placeholder="Enter your MOS or Rating"
                                    className={cn(error && !state.code.trim() && "border-red-500")}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            'Analyze Resume'
                        )}
                    </Button>
                </form>

                {showResult && renderAnalysis()}
            </CardContent>
        </Card>
    )
}

export default ResumeCard
