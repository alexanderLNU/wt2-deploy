import Movie from '../models/Movie.js'

/**
 * Retrieves and returns all movies from DB.
 *
 * @param {object} req      The Express request object.
 * @param {object} res      The Express response object.
 * @returns {Promise<void>} Send the movies as JSON response.
 */
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({})
    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Retrieves and returns movies with a review rating greater than or equal to the specified rating.
 *
 * @param {object} req      The Express request object.
 * @param {object} res      The Express response object.
 * @returns {Promise<void>} Send the movies filtered by rating in JSON response.
 */
export const getMoviesWithRatingAboveSpecified = async (req, res) => {
  const rating = parseFloat(req.params.rating)
  try {
    const movies = await Movie.find({ 'Review Rating': { $gte: rating } })
    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Retrieves and returns the top 10 highest-rated movies.
 *
 * @param {object} req      The Express request object.
 * @param {object} res      The Express response object.
 * @returns {Promise<void>} Send the top 10 highest-rated movies in JSON response.
 */
export const getMoviesWithBestRating = async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ 'Review Rating': -1 }).limit(10)
    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Aggregates movies and returns the number of movies released per year.
 *
 * @param {object} req      The Express request object.
 * @param {object} res      The Express response object.
 * @returns {Promise<void>} Sends aggregated movie data by year in JSON format.
 */
export const getMoviesPerYear = async (req, res) => {
  try {
    const moviesPerYear = await Movie.aggregate([
      // 1. Filter only valid dates with the format of DAY-MON-YEAR.
      {
        $match: {
          'Release Date': {
            $regex: /^\d{1,2}-[A-Za-z]{3}-\d{2}$/
          }
        }
      },

      // 2. Split the date on the "-" and choose the yearpart (The last part).
      {
        $addFields: {
          yearNum: {
            $toInt: { $arrayElemAt: [{ $split: ['$Release Date', '-'] }, 2] }
          }
        }
      },

      // 3. All years are after 2000 so add 2000 to get correct year.
      {
        $addFields: {
          ReleaseYear: { $add: ['$yearNum', 2000] }
        }
      },

      // 4. Group the movies per year.
      {
        $group: {
          _id: '$ReleaseYear',
          count: { $sum: 1 }
        }
      },

      // 5. Sort them after year.
      {
        $sort: { _id: 1 }
      }
    ])

    res.json(moviesPerYear)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Retrieves and returns countries sorted by highest average movie ratings.
 * Country has to have at least 10 movies.
 *
 * @param {object} req      The Express request object.
 * @param {object} res      The Express response object.
 * @returns {Promise<void>} Sends top countries data based on average movie rating in JSON format.
 */
export const getTopCountriesByRating = async (req, res) => {
  const countryQuery = req.query.country

  try {
    const pipeline = [
      // Filter movies with rating and countrey.
      {
        $match: {
          'Review Rating': { $exists: true, $ne: null },
          'Release Country': { $exists: true, $ne: null }
        }
      },
      // Groups movies by country and calc avg rating and number of movies.
      {
        $group: {
          _id: '$Release Country',
          avgRating: { $avg: '$Review Rating' },
          movieCount: { $sum: 1 }
        }
      },
      // Country HAS TO HAVE 10 movies.
      {
        $match: {
          movieCount: { $gte: 10 }
        }
      },
      // If searching for a specific country, filter the results.
      ...(countryQuery ? [{ $match: { _id: { $regex: countryQuery, $options: 'i' } } }] : []),
      // SOrt after average rating.
      {
        $sort: { avgRating: -1 }
      }
    ]

    const topCountries = await Movie.aggregate(pipeline)

    // Return error msg if search doesnt doesnt match any country.
    if (countryQuery && topCountries.length === 0) {
      return res.status(404).json({ message: `Country "${countryQuery}" not found or has fewer than 10 movies.` })
    }

    res.json(topCountries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
