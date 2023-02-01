package universitymanagementsystem;
import java.awt.Image;
import javax.swing.*;

public class splash extends JFrame implements Runnable{
    Thread t;
    
    splash(){
        t = new Thread(this);
        t.start();
        setTitle("Welcome");
        ImageIcon i1 = new ImageIcon(ClassLoader.getSystemResource("icons/covernitgoa.jpg"));
        Image i2 = i1.getImage().getScaledInstance(957, 500, Image.SCALE_DEFAULT);
        ImageIcon i3 = new ImageIcon(i2);
        JLabel image = new JLabel(i3);
        add(image);
        setVisible(true);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // exits the program
        
        for(int i=0, x=0;i<300;i+=5, x+=7.5){
            setLocation(600 - i,450 - i); // max 1240,720
            setSize(2*i+200,x);
            try{
                Thread.sleep(10);
            }
            catch(Exception e){
                
            }
        }
    }
    public void run(){
        try{
            Thread.sleep(5000);
            setVisible(false);
            dispose(); // exits the JFrame
            new login();
        }catch(Exception e){
            
        }
    }
    public static void main(String []args){
        new splash();
        System.out.print("Hello there!");
    }
}
