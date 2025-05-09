package src.main.java.com.carrental.models;



import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Vehicle vehicle;

    private Date startDate;
    private Date endDate;
    private String status; // SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED
}

