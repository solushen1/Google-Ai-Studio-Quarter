import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Department } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import { SpinnerIcon } from './icons/EditorIcons';

interface AITemplateGeneratorProps {
  onTemplateCreated: (newSchema: Department) => void;
}

// Define the response schema for the AI model
const responseSchema = {
    type: Type.OBJECT,
    properties: {
        department: { type: Type.STRING, description: 'The name of the department for the report.' },
        sections: {
            type: Type.ARRAY,
            description: 'The different sections of the report.',
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: 'The title of this section.' },
                    fields: { 
                        type: Type.ARRAY,
                        description: 'A list of fields in this section. Do not use if section type is "table".',
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                label: { type: Type.STRING, description: 'The label for the input field.' },
                                type: { type: Type.STRING, description: 'The type of field. Can be "text", "number", "date", "textarea", or "signature".' }
                            },
                        },
                    },
                    type: { type: Type.STRING, description: 'Set to "table" if this section is a table. Omit otherwise.' },
                    columns: {
                        type: Type.ARRAY,
                        description: 'A list of column headers for the table. Only use if section type is "table".',
                        items: { type: Type.STRING }
                    },
                    rows: {
                        type: Type.ARRAY,
                        description: 'A list of pre-defined row labels for the first column of the table. Only use if section type is "table".',
                        items: { type: Type.STRING }
                    },
                    allowPhotos: { type: Type.BOOLEAN, description: 'Whether this section should allow photo uploads.' }
                }
            }
        }
    }
};


const AITemplateGenerator: React.FC<AITemplateGeneratorProps> = ({ onTemplateCreated }) => {
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for the report template.');
      return;
    }
    if (!apiKey.trim()) {
      setError('Please enter your Gemini API key.');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
        const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
        
        const fullPrompt = `Based on the user's request, create a detailed report template for a church department. The output must be a JSON object that strictly follows the provided schema.

        User Request: "${prompt}"

        Instructions:
        - The 'department' name should be concise and descriptive.
        - Create logical 'sections' for the report.
        - For each section, decide if it should contain a list of 'fields' or be a 'table'. A section cannot be both.
        - For field-based sections, create appropriate labels and types ('text', 'number', 'date', 'textarea', 'signature').
        - For table-based sections, define 'columns' and a list of starter 'rows'.
        - Include a 'Signatures' section at the end with fields of type 'signature'.
        - You can add 'allowPhotos: true' to any section where pictures might be relevant.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: fullPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

      const jsonString = response.text;
      const generatedSchema = JSON.parse(jsonString) as Department;
      
      // Basic validation
      if (generatedSchema.department && Array.isArray(generatedSchema.sections)) {
         onTemplateCreated(generatedSchema);
         setPrompt('');
      } else {
        throw new Error("The AI returned an invalid template structure.");
      }

    } catch (err) {
      console.error("AI Generation Error:", err);
      setError("Sorry, something went wrong while generating the template. Please check your prompt or try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-8">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Create a New Template with AI</h3>
        <p className="text-sm text-slate-600 mb-4">
          Describe the report you want to create. For example, "A monthly report for the church choir with member attendance and songs performed."
        </p>
        <div className="mb-4">
          <label htmlFor="api-key" className="block text-sm font-medium text-slate-700 mb-2">
            Gemini API Key
          </label>
          <Input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API key..."
            disabled={isLoading}
          />
          <p className="text-xs text-slate-500 mt-1">
            Get your API key from <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://ai.google.dev/</a>
          </p>
        </div>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter report description here..."
          rows={3}
          disabled={isLoading}
        />
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <div className="mt-4 flex justify-end">
          <Button 
            onClick={handleGenerate} 
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 disabled:opacity-75"
          >
            {isLoading ? (
              <>
                <SpinnerIcon />
                Generating...
              </>
            ) : (
              'Generate Template'
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AITemplateGenerator;
