'use client'

import React from 'react'

interface LexicalContentProps {
  content: any
}

export function LexicalContent({ content }: LexicalContentProps) {
  if (!content) {
    return null
  }

  // Helper function to render Lexical nodes
  const renderNode = (node: any): React.ReactNode => {
    if (!node) return null

    switch (node.type) {
      case 'paragraph':
        return (
          <p key={node.id || Math.random()}>
            {node.children?.map((child: any) => renderNode(child))}
          </p>
        )
      
      case 'heading':
        const HeadingTag = `h${node.tag}` as keyof JSX.IntrinsicElements
        return (
          <HeadingTag key={node.id || Math.random()}>
            {node.children?.map((child: any) => renderNode(child))}
          </HeadingTag>
        )
      
      case 'list':
        const ListTag = node.listType === 'bullet' ? 'ul' : 'ol'
        return (
          <ListTag key={node.id || Math.random()}>
            {node.children?.map((child: any) => renderNode(child))}
          </ListTag>
        )
      
      case 'listitem':
        return (
          <li key={node.id || Math.random()}>
            {node.children?.map((child: any) => renderNode(child))}
          </li>
        )
      
      case 'link':
        return (
          <a
            key={node.id || Math.random()}
            href={node.fields?.url || '#'}
            target={node.fields?.newTab ? '_blank' : undefined}
            rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
          >
            {node.children?.map((child: any) => renderNode(child))}
          </a>
        )
      
      case 'text':
        let text: React.ReactNode = node.text || ''
        
        if (node.format) {
          if (node.format & 1) text = <strong>{text}</strong> // Bold
          if (node.format & 2) text = <em>{text}</em> // Italic
          if (node.format & 4) text = <s>{text}</s> // Strikethrough
          if (node.format & 8) text = <u>{text}</u> // Underline
          if (node.format & 16) text = <code>{text}</code> // Code
        }
        
        return text
      
      default:
        // For unknown types, try to render children
        if (node.children) {
          return node.children.map((child: any) => renderNode(child))
        }
        return null
    }
  }

  // Handle the root content structure
  const renderContent = () => {
    if (typeof content === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: content }} />
    }
    
    if (content.root?.children) {
      return content.root.children.map((node: any) => renderNode(node))
    }
    
    return <div>{JSON.stringify(content)}</div>
  }

  return <div>{renderContent()}</div>
}
