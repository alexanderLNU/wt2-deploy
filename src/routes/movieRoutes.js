import express from 'express'
import { getAllMovies, getMoviesWithRatingAboveSpecified, getMoviesWithBestRating, getMoviesPerYear, getTopCountriesByRating } from '../controllers/movieController.js'

const router = express.Router()

router.get('/', getAllMovies)
router.get('/rating/:rating', getMoviesWithRatingAboveSpecified)
router.get('/top-rated', getMoviesWithBestRating)
router.get('/movies-per-year', getMoviesPerYear)
router.get('/top-countries', getTopCountriesByRating)

export default router
