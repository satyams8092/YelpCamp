const Campground = require('../models/campground');
const { cloudinary } = require("../cloudinary");

const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campground/index', { campgrounds })
}

module.exports.renderNewForm = (req, res) => {
    res.render('campground/new')
}

module.exports.createCampground = async (req, res, next) => {

    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    // console.log(geoData);
    if (!geoData.features?.length) {
        req.flash('error', 'Could not geocode that location. Please try again and enter a valid location.');
        return res.redirect('/campgrounds/new');
    }

    const campground = new Campground(req.body.campground)

    campground.geometry = geoData.features[0].geometry;
    campground.location = geoData.features[0].place_name;

    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id
    await campground.save()
    req.flash('success', 'Successfully created a Campground!')
    res.redirect(`/campgrounds/${campground.id}`)

}

module.exports.showCampground = async (req, res,) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campground/show', { campground });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campground/edit', { campground });
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;

    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    if (!geoData.features?.length) {
        req.flash('error', 'Could not geocode that location. Please try again and enter a valid location.');
        return res.redirect(`/campgrounds/${id}/edit`);
    }

    // ✅ Include geometry in the update directly
    const campground = await Campground.findByIdAndUpdate(id, { 
        ...req.body.campground,
        geometry: geoData.features[0].geometry,
        location: geoData.features[0].place_name
    }, { new: true }); // ← { new: true } returns updated document

    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgs);
    await campground.save();

    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }

    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
}