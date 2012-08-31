package jsp;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.HibernateException;

public class ItemController extends HttpServlet {

    private static final long serialVersionUID = 1L;

    public ItemController() {
        super();
    }

    /* Our code doesn't use any GET requests, so we instead do a POST request
    which will just list the items we have saved in the database. */

    @Override
    protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        try {
            ItemManager manager = ItemManagerFactory.getManager();

            request.setAttribute("items", manager.getItems());
            request.getRequestDispatcher("jsp/index.jsp").forward(request, response);

        // ItemManager methods can throw HibernateException, so we catch them with a standard error page.
        } catch (HibernateException e) {
            request.setAttribute("error", "Invalid query, please try again.");
            request.getRequestDispatcher("jsp/error.jsp").forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        try {
            ItemManager manager = ItemManagerFactory.getManager();

            if (request.getParameter("remove") != null) {
                String name = request.getParameter("removeName");
                manager.delete(name);

            } else if (request.getParameter("add") != null) {
                String name = request.getParameter("name");
                String comment = request.getParameter("comment");
                manager.add(new Item(name, comment));
            }
            
            // Finally, we do our usual page layout
            doGet(request, response);

        // ItemManager methods can throw HibernateException, so we catch them with a standard error page.
        } catch (HibernateException e) {
            request.setAttribute("error", "Invalid query, please try again.");
            request.getRequestDispatcher("jsp/error.jsp").forward(request, response);
        }
    }
}
