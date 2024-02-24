package com.example.demo.controller;

import com.example.demo.models.Book;
import com.example.demo.models.BookDTO;
import com.example.demo.models.User;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(path = "api/v1/book")
public class BookController {

    @Autowired
    private BookService bookService;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("all")
    public List<BookDTO> getBooks() {
        return bookService.getAllBooks();
    }

    @PostMapping("addUserToBook")
    public ResponseEntity<String> addUserToBook(@RequestParam("bookId") long bookId,
                                                @RequestParam("userId") long userId){
        return bookService.addBook(bookId, userId);
    }

    @PostMapping("addBook")
    public ResponseEntity<String> addBookWithoutUser(@RequestParam("image") MultipartFile image,
                                                  @RequestParam("title") String title,
                                                  @RequestParam("author") String author,
                                                  @RequestParam("language") String language){
        return bookService.addBookWithoutUser( image, title , author , language);
    }

    @PutMapping("update/{bookId}")
    public void updateBook(@PathVariable("bookId") long bookId,@RequestBody Book newBook){
        bookService.updateBook(bookId,newBook);
    }

    @DeleteMapping("delete/{bookId}")
    public void deleteBook(@PathVariable("bookId") long bookId){
        bookService.deleteBook(bookId);
    }

    @GetMapping("{id}")
    public ResponseEntity<byte[]> getBook(@PathVariable long id) {
        Optional<Book> bookOptional = bookRepository.findById(id);
        if (!bookOptional.isPresent()) {
            return ResponseEntity.notFound()
                    .build();
        }
        Book book = bookOptional.get();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "Book name=\"" + book.getTitle() + "\"")
                .contentType(MediaType.IMAGE_JPEG)
                .body(book.getBookImage());
    }

    @GetMapping("find")
    private BookDTO getBookById(@RequestParam long bookId){
        return bookService.getBookById(bookId);
    }

    @GetMapping("find/user")
    private List<BookDTO> getBookByUser(@RequestParam("userId") long userId){
        return bookService.getBookForUser(userId);
    }

    @PutMapping("unreserve")
    public void unReserveBook(@RequestParam("bookId") long bookId){
            bookService.unReserveBook(bookId);
    }
}
