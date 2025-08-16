import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface PromptEditorProps {
  template: string
  variablesSchema: Record<string, any>
  preview: string
}

export function PromptEditor({ template, variablesSchema, preview }: PromptEditorProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="template">Template</Label>
          <Textarea
            id="template"
            value={template}
            placeholder="Enter your prompt template..."
            className="mt-2"
          />
        </div>
        
        <div>
          <Label>Variables</Label>
          <div className="mt-2 space-y-2">
            {Object.entries(variablesSchema).map(([key, value]) => (
              <div key={key} className="text-sm">
                <span className="font-mono bg-muted px-2 py-1 rounded">{key}</span>
                <span className="ml-2 text-muted-foreground">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Label>Preview</Label>
          <div className="mt-2 p-3 bg-muted rounded-lg text-sm">
            {preview}
          </div>
        </div>
      </div>
    </Card>
  )
}