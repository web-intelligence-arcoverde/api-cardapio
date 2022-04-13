'use strict'

const { manage_single_upload } = require('../../Helpers')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Image = use('App/Models/Image')

const { image_single_upload } = use('App/Helpers')

//const Helpers = use('Helpers')


class ImageController {
     /**
   * Show a list of all produtos.
   * GET produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, pagination }) {

    const images = await Image.query().orderBy('id', 'DESC')
    .paginate(pagination.page, pagination.limit)
    return response.send(images)
}

/**
 * Render a form to be used for creating a new produto.
 * GET produtos/create
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 * @param {View} ctx.view
 */

/**
 * Create/save a new produto.
 * POST produtos
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
async store ({ request, response }) {


    try {
       //captura de uma imagem ou mais do request 
       const FileJar = request.file('images', {

           types: ['image'],
           size: '2mb' 
       }) 

       // retorno usuario
       let images = []
       // caso seja um único arquivo - manage_single_upload
       // caso seja vários arquivos  - manage_multiple_upload
       if(!FileJar.files){
           const file = await  manage_single_upload(FileJar)
           if(file.moved()){


            const image = await Image.create({

                path : file.fileName
                size : file.size, 
                original_name: file.clientName, 
                extension: file.subtype 
            })
            images.push(image)
            return response.status(201).send({sucesses: images, errors: {} })
           }
       }
    } catch (error) {
        
    }
}

/**
 * Display a single produto.
 * GET produtos/:id
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 * @param {View} ctx.view
 */
async show ({ params, request, response, view }) {
}

/**
 * Render a form to update an existing produto.
 * GET produtos/:id/edit
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 * @param {View} ctx.view
 */
async edit ({ params, request, response, view }) {
}

/**
 * Update produto details.
 * PUT or PATCH produtos/:id
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
async update ({ params, request, response }) {
}

/**
 * Delete a produto with id.
 * DELETE produtos/:id
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
async destroy ({ params, request, response }) {
}




}

module.exports = ImageController
 