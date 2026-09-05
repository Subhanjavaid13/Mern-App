import { useState } from 'react'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import * as notesApi from '../lib/notesApi'
import { STORAGE_KEYS } from '../utils/constants'
import BackLink from '../components/ui/BackLink'
import Container from '../components/ui/Container'
import PageHeader from '../components/ui/PageHeader'
import NoteForm from '../components/notes/NoteForm'

export default function CreatePage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (data) => {
    setSubmitting(true)
    try {
      await notesApi.createNote(data)
      toast.success('Note saved. Nicely done!')
      navigate('/')
      return true
    } catch (error) {
      toast.error(
        error?.status === 429
          ? 'Too many requests — take a breath and try again.'
          : 'Could not save the note. Please try again.',
      )
      return false
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container className="pb-24 pt-8 sm:pt-12">
      <BackLink to="/">All notes</BackLink>

      <PageHeader
        className="mt-5"
        eyebrow="Fresh page"
        title="Write a new note"
        description="Capture the thought before it cools. Drafts save automatically while you type."
      />

      <NoteForm
        className="mt-8"
        autosaveKey={STORAGE_KEYS.DRAFT}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
        submitting={submitting}
        submitLabel="Save note"
      />
    </Container>
  )
}
