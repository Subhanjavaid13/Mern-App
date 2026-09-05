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
      toast.success('Note saved.')
      navigate('/')
      return true
    } catch (error) {
      toast.error(notesApi.errorMessage(error, 'Could not save the note. Please try again.'))
      return false
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container className="pb-16 pt-6 sm:pt-8">
      <BackLink to="/">All notes</BackLink>

      <PageHeader
        className="mt-4"
        eyebrow="New note"
        title="Write a new note"
        description="Drafts are saved automatically while you type."
      />

      <NoteForm
        className="mt-6"
        autosaveKey={STORAGE_KEYS.DRAFT}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
        submitting={submitting}
        submitLabel="Save note"
      />
    </Container>
  )
}
