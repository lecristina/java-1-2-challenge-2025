package com.trackzone.Java.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trackzone.Java.model.Filial;
import com.trackzone.Java.repository.FilialRepository;

@Service
public class FilialService {

	 @Autowired
	    private FilialRepository filialRepository;

	    public Filial update(Long id, Filial filial) {
	        Filial existente = filialRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Filial não encontrada"));
	        existente.setNome(filial.getNome());
	        existente.setEmail(filial.getEmail());
	        return filialRepository.save(existente);
	    }

	    public void delete(Long id) {
	        filialRepository.deleteById(id);
	    }
}
