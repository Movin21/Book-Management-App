import { NextResponse } from 'next/server'
import type { BookDetails } from '@/types/books'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = decodeURIComponent(params.id)
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY

  console.log('API Route: Fetching book details for ID:', id)
  console.log('API Key status:', API_KEY ? 'Present' : 'Missing')

  if (!API_KEY) {
    console.error('API key is not configured')
    return NextResponse.json({ error: 'API key is not configured' }, { status: 500 })
  }

  try {
    const url = new URL(`https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(id)}`)
    url.searchParams.append('key', API_KEY)
    
    console.log('Fetching from URL:', url.toString().replace(API_KEY, 'REDACTED'))
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('Google Books API Response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error response from Google Books API:', errorText)
      
      if (response.status === 404) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 })
      }
      
      return NextResponse.json({ error: `API responded with status ${response.status}` }, { status: response.status })
    }

    const data = await response.json()
    console.log('Received data from Google Books API:', JSON.stringify(data, null, 2))

    const bookDetails: BookDetails = {
      id: data.id,
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors || [],
      description: data.volumeInfo.description || '',
      publishedDate: data.volumeInfo.publishedDate || '',
      pageCount: data.volumeInfo.pageCount || 0,
      categories: data.volumeInfo.categories || [],
      imageLinks: data.volumeInfo.imageLinks || {},
      language: data.volumeInfo.language || '',
      averageRating: data.volumeInfo.averageRating || 0,
      ratingsCount: data.volumeInfo.ratingsCount || 0,
    }

    console.log('Sending book details to client:', JSON.stringify(bookDetails, null, 2))
    return NextResponse.json(bookDetails)
  } catch (error) {
    console.error('Error in API route:', error)
    return NextResponse.json({ error: 'Failed to fetch book details' }, { status: 500 })
  }
}

