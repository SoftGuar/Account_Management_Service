// handlers/helperRecommendationHandler.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { HelperRecommendationService } from '../services/helperRecommendationService';
import {UpdateHelperRecommendationInput,CreateHelperRecommendationInput} from '../models/helperRecommendation.model'

export const createHelperRecommendation = async (
  request: FastifyRequest<{ Body: CreateHelperRecommendationInput }>,
  reply: FastifyReply
) => {
  try {
    const data = request.body;

    
    const recommendation = await HelperRecommendationService.createRecommendation(data);
    
    return reply.code(201).send({
      success: true,
      data: recommendation
    });
  } catch (error: any) {
    return reply.code(400).send({
      success: false,
      message: error.message || 'Failed to create helper recommendation'
    });
  }
};

export const getHelperRecommendations = async (
  request: FastifyRequest ,
  reply: FastifyReply
) => {
  try {
    const recommendations = await HelperRecommendationService.getAllRecommendations();
    
    return reply.code(200).send({
      success: true,
      data: recommendations
    });
  } catch (error: any) {
    
    return reply.code(500).send({
      success: false,
      message: error.message || 'Failed to get helper recommendations'
      
    });
  }
};

export const getHelperRecommendationById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const recommendation = await HelperRecommendationService.getRecommendationById(Number(id));
    
    return reply.code(200).send({
      success: true,
      data: recommendation
    });
  } catch (error: any) {
    return reply.code(404).send({
      success: false,
      message: error.message || 'Helper recommendation not found'
    });
  }
};

export const approveHelperRecommendation = async (
  request: FastifyRequest<{ Params: { id: string }, Body: { password: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const { password } = request.body;
    
    const result = await HelperRecommendationService.approveRecommendation(Number(id), password);
    
    return reply.code(200).send({
      success: true,
      data: result,
      message: 'Helper recommendation approved successfully'
    });
  } catch (error: any) {
    return reply.code(400).send({
      success: false,
      message: error.message || 'Failed to approve helper recommendation'
    });
  }
};

export const rejectHelperRecommendation = async (
  request: FastifyRequest<{ Params: { id: string }, Body: { notes?: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const { notes } = request.body;
    
    const result = await HelperRecommendationService.rejectRecommendation(Number(id), notes);
    
    return reply.code(200).send({
      success: true,
      data: result,
      message: 'Helper recommendation rejected successfully'
    });
  } catch (error: any) {
    return reply.code(400).send({
      success: false,
      message: error.message || 'Failed to reject helper recommendation'
    });
  }
};

export const deleteHelperRecommendation = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    
    await HelperRecommendationService.deleteRecommendation(Number(id));
    
    return reply.code(200).send({
      success: true,
      message: 'Helper recommendation deleted successfully'
    });
  } catch (error: any) {
    return reply.code(400).send({
      success: false,
      message: error.message || 'Failed to delete helper recommendation'
    });
  }
};