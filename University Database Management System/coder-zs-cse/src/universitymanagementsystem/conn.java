package universitymanagementsystem;

import java.sql.*;
import java.util.zip.CRC32;

public class conn {
    Connection c;
    Statement s;

    conn(){
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            c = DriverManager.getConnection("jdbc:mysql://localhost:3306/universitymanagementsystem", "root", "cselab1");
            s = c.createStatement();
        }
        catch(Exception e){
            e.printStackTrace(); //prints the exception or error that is faced
        }
    }
    public static void main(String []args){
        new conn();
    }
}
