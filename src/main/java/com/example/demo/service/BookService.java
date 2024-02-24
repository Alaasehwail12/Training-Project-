package com.example.demo.service;

import com.example.demo.models.Book;
import com.example.demo.models.BookDTO;
import com.example.demo.models.User;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;

    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(this::mapToBookResponse)
                .collect(Collectors.toList());
    }

    public ResponseEntity<String> addBook(long bookId, long userId) {

        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Book> bookOptional = bookRepository.findById(bookId);

        if(userOptional.isPresent() && bookOptional.isPresent()){
            Book book = bookOptional.get();
            User user = userOptional.get();
            book.setUser(user);
            bookRepository.save(book);
            return ResponseEntity.ok("Book added successfully");
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }
    }

    @Transactional
    public void updateBook(long bookId, Book newBook) {
        Book oldBook =  bookRepository.findById(bookId).orElseThrow(
                () -> new IllegalStateException("Book you want to update does not exist!")
        );

        if(newBook.getTitle() != null && newBook.getTitle().length() > 0 &&
                   !Objects.equals(newBook.getTitle(), oldBook.getTitle())){
                        oldBook.setTitle(newBook.getTitle());
        }
        if(newBook.getAuthor() != null && newBook.getAuthor().length() > 0 &&
                   !Objects.equals(oldBook.getAuthor(), newBook.getAuthor())){
                        oldBook.setAuthor(newBook.getAuthor());
        }
        if(newBook.getLanguage() != null && newBook.getLanguage().length() > 0 &&
                !Objects.equals(oldBook.getLanguage(), newBook.getLanguage())){
            oldBook.setLanguage(newBook.getLanguage());
        }
       if(newBook.getBookImage() != null  &&
                !Objects.equals(oldBook.getBookImage(), newBook.getBookImage())){
            oldBook.setBookImage(newBook.getBookImage());
        }
    }

    @Transactional
    public void deleteBook(long bookId) {
                boolean isExist = bookRepository.existsById(bookId);
                if(!isExist){
                    throw new IllegalStateException("Book you want to delete does not exist!");
                }
                bookRepository.deleteById(bookId);
    }

    public BookDTO getBookById(long bookId) {
       Optional<Book> bookOptional = bookRepository.findById(bookId);

       if(! bookOptional.isPresent()){
           throw new IllegalStateException("book does not exist");
       }
       Book book = bookOptional.get();
       BookDTO bookDTO = mapToBookResponse(book);
        return bookDTO;
    }

    @Transactional
    public List<BookDTO> getBookForUser(long userId){
        return bookRepository.findByUserUserId(userId).stream()
                .map(this::mapToBookResponse)
                .collect(Collectors.toList());
    }

    private BookDTO mapToBookResponse(Book book) {
        String downloadURL = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/book/")
                .path(String.valueOf(book.getBookId()))
                .toUriString();
        BookDTO bookDTO = new BookDTO();
        bookDTO.setBookId(book.getBookId());
        bookDTO.setTitle(book.getTitle());
        bookDTO.setAuthor(book.getAuthor());
        bookDTO.setLanguage(book.getLanguage());
        bookDTO.setUrl(downloadURL);
        bookDTO.setUser(book.getUser());
        return bookDTO;
    }

    public ResponseEntity<String> addBookWithoutUser(MultipartFile image, String title, String author, String language) {
        try {
            byte[] imageContent = image.getBytes();
            String imageName = image.getOriginalFilename();

                Book book = new Book();

                book.setBookImage(imageContent);
                book.setBookImageName(imageName);
                book.setTitle(title);
                book.setAuthor(author);
                book.setLanguage(language);
                bookRepository.save(book);
                return ResponseEntity.ok("Book added successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error adding the Book");
        }
    }

    public void unReserveBook(long bookId) {
        Optional<Book> bookOptional = bookRepository.findById(bookId);

        if(! bookOptional.isPresent()){
            throw new IllegalStateException("book does not exist");
        }
        Book book = bookOptional.get();
        book.setUser(null);
        bookRepository.save(book);
    }
}
