const express = require("express")
const router = express.Router()

const ZingController = require("../../controllers/ZingController")

// getSong
router.get("/song", ZingController.getSong)

// getDetailPlaylist
router.get("/detailplaylist", ZingController.getDetailPlaylist)

// getHome
router.get("/home", ZingController.getHome)

// getTop100
router.get("/top100", ZingController.getTop100)

// getChartHome
router.get("/charthome", ZingController.getChartHome)

// getNewReleaseChart
router.get("/newreleasechart", ZingController.getNewReleaseChart)

// getInfoSong
router.get("/infosong", ZingController.getInfo)

// getArtist
router.get("/artist", ZingController.getArtist)

// getArtistSong
router.get("/artistsong", ZingController.getArtistSong)

// getLyric
router.get("/lyric", ZingController.getLyric)

// search
router.get("/search", ZingController.search)

// getListMV
router.get("/listmv", ZingController.getListMV)

// getCategoryMV
router.get("/categorymv", ZingController.getCategoryMV)

// getVideo
router.get("/video", ZingController.getVideo)

module.exports = router
