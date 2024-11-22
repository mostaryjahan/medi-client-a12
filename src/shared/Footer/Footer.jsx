const Footer = () => {
  return (
    <div>
      <footer className="footer p-4 lg:p-10 bg-black text-neutral-content flex justify-around">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company </h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Contact</h6>
          <a className="link link-hover">Google</a>
          <a className="link link-hover">Facebook</a>
          <a className="link link-hover">Twitter</a>
        </nav>
      </footer>

      <footer className="footer footer-center p-4 bg-black text-neutral-content t">
        <aside>
          <p>Copyright © 2024 - All right reserved by Medi Corner Ltd.</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
