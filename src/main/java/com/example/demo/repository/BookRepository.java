package com.example.demo.repository;

import com.example.demo.models.Book;
import com.example.demo.models.BookDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book,Long> {
    List<Book> findByUserUserId(long userId);

 }
