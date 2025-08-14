"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"

type TagInputProps = {
  placeholder?: string
  tags: string[]
  setTags: (tags: string[]) => void
  suggestions?: string[]
  className?: string
  maxTags?: number
}

export function TagInput({
  placeholder = "Adicionar tag...",
  tags,
  setTags,
  suggestions = [],
  className,
  maxTags = 10,
}: TagInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < maxTags) {
      setTags([...tags, trimmedTag])
      setInputValue("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const filteredSuggestions = suggestions.filter(
    (suggestion) => !tags.includes(suggestion) && suggestion.toLowerCase().includes(inputValue.toLowerCase()),
  )

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="px-2 py-1">
            {tag}
            <button
              type="button"
              className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
              onClick={() => handleRemoveTag(tag)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {tag}</span>
            </button>
          </Badge>
        ))}
      </div>
      <Command className="overflow-visible bg-transparent">
        <div className="border rounded-md px-3 py-2 flex items-center gap-2 bg-background">
          {tags.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-2 py-1">
                  {tag}
                  <button
                    type="button"
                    className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {tag}</span>
                  </button>
                </Badge>
              ))}
            </div>
          )}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue) {
                e.preventDefault()
                handleAddTag(inputValue)
              } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
                handleRemoveTag(tags[tags.length - 1])
              }
            }}
            onBlur={() => {
              if (inputValue) {
                handleAddTag(inputValue)
              }
              setOpen(false)
            }}
            onFocus={() => setOpen(true)}
            placeholder={tags.length === 0 ? placeholder : ""}
            className="flex-1 outline-none bg-transparent placeholder:text-muted-foreground"
          />
        </div>
        {open && filteredSuggestions.length > 0 && (
          <div className="relative mt-2">
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover shadow-md">
              <CommandGroup className="h-full overflow-auto">
                {filteredSuggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion}
                    onSelect={() => {
                      handleAddTag(suggestion)
                      setOpen(false)
                    }}
                  >
                    {suggestion}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          </div>
        )}
      </Command>
      {tags.length >= maxTags && (
        <p className="text-sm text-muted-foreground mt-2">Limite máximo de {maxTags} tags atingido.</p>
      )}
    </div>
  )
}
