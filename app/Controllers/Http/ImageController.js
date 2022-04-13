'use strict'


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Image = use('App/Models/Image')

import { unlink } from 'fs';

const { image_single_upload, manage_multiple_uploads } = use('App/Helpers')


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
       }); 

       // retorno usuario
       let images = []


       // caso seja um único arquivo - manage_single_upload
       
       if(!FileJar.files){

        const file = await image_single_upload(FileJar)

           if(file.moved()){
            //single upload
            const image = await Image.create({

                path : file.fileName,
                size : file.size, 
                original_name: file.clientName, 
                extension: file.subtype 
            })
            images.push(image)
            return response.status(201).send({sucesses: images, errors: {} }) */
           
        }
        return  response.status(400).send({
             message: 'Não foi possível processar esta imagem no momento!'
        });
       }
       // caso seja vários arquivos  - manage_multiple_upload

       let files = await manage_multiple_uploads(FileJar)

       await Promise.all(
           files.sucesses.map(async file => {

            const image = await Image.create({
                path: file.fileName,
                size: file.size, 
               original_name: file.clientName,
               extension: file.subtype
            })
            image.push(image)
           })
       )
       return response.status(201).send({ sucesses: images, errors: files.errors})

    } catch (error) {
        return response.status(400).send({

            message: 'não foi possível a sua solicitação'
        }
        
        )
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
async show ({ params: { id }, request, response, view }) {
    const image = await image.findOrFail(id)
    return response.send(image)
}

/**
 * Update produto details.
 * PUT or PATCH produtos/:id
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
async update ({ params: { id }, request, response }) {
    const image = await Image.findOrFail(id)

    try {
        image.merge(request.only(['original_name']));
        await image.save()
    } catch (error) {
        return response.status(400).send({
            message: 'Não foi possível atualizar essa imagem!, configure e tente novamente.'
        })
    }
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
    const image = await Image.findOrFail(id)
    try {
        let filepatch = Helpers.publicPatch(`uploads/${image.patch}`)
        await fs.unlink(filepatch, err =>{ 
            if(!err)
            await image.delete()
        })
        return response.status(204).send()
    } catch (error) {
        return response.status(400).send({
            message: 'Não foi possível deletar a imagem do momento.'
        });
        
    }
}

}

module.exports = ImageController
 