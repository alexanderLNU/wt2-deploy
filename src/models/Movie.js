import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  Title: String,
  Genres: String,
  'Release Date': String,
  'Release Country': String,
  'Review Rating': Number,
  'Movie Run Time': String,
  Plot: String,
  Cast: String,
  Language: String,
  'Filming Locations': String
}, { collection: 'movies' })
const Movie = mongoose.model('Movie', movieSchema)

export default Movie
