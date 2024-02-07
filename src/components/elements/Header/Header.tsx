import { Component, SyntheticEvent } from "react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes.constants";
import { SearchIcon } from "../../ui/Icons/SearchIcon";
import OffcanvasModal from "../../modals/OffcanvasModal/OffcanvasModal";
import SearchByCategory from "../../modals/SearchByCategoryModal";

interface HeaderState {
  activateOffcanvas: boolean;
  activateSearch: boolean;
  scroll: number;
  top: number;
}

class Header extends Component<NonNullable<unknown>, HeaderState> {
  private mount: boolean | undefined;

  constructor(props: NonNullable<unknown>) {
    super(props);
    this.state = {
      activateOffcanvas: false,
      activateSearch: false,
      scroll: 0,
      top: 57,
    };
    this.getMenuActiveStatus = this.getMenuActiveStatus.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleClickOffcanvas(e: SyntheticEvent) {
    e.preventDefault();
    this.setState({ activateOffcanvas: !this.state.activateOffcanvas });
  }

  getMenuActiveStatus(status: boolean) {
    this.setState({
      activateOffcanvas: status,
    });
  }

  handleClickSearch(e: SyntheticEvent) {
    e.preventDefault();
    this.setState((prevState) => ({
      ...prevState,
      activateSearch: !this.state.activateSearch,
    }));
  }

  handleScroll() {
    if (this.mount) {
      this.setState({ scroll: window.scrollY });
    }
  }

  componentDidMount() {
    this.mount = true;
    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(): void {
    this.state.scroll > this.state.top
      ? (document.body.style.paddingTop = `50px`)
      : (document.body.style.paddingTop = "0");
  }

  componentWillUnmount() {
    this.mount = false;
  }

  handleCloseActiveSearch = () => {
    this.setState((prevState) => ({ ...prevState, activateSearch: false }));
  };

  onClose = () => {
    this.setState({ activateOffcanvas: false });
  };

  render() {
    return (
      <header
        className={`sticker ${
          this.state.scroll > this.state.top ? "stick body-gradient" : ""
        }`}
      >
        <div className="header-wrapper">
          <div className="container space-y--15">
            <div className="flex justify-space align-center">
              <div className="flex align-center gap--10">
                <button
                  className="header-menu-trigger"
                  onClick={(e) => this.handleClickOffcanvas(e)}
                >
                  <FiMenu />
                </button>
                <Link to={ROUTES.HOME_SCREEN.FULL_ROUTE_NAME}>
                  <h2>Qleads</h2>
                </Link>
              </div>
              <div className="flex align-center">
                <div
                  className="header-logo"
                  onClick={(e) => this.handleClickSearch(e)}
                >
                  <SearchIcon className="header-search-icon" />
                </div>
              </div>
            </div>
          </div>
          <OffcanvasModal
            show={this.state.activateOffcanvas}
            activeStatus={this.getMenuActiveStatus}
            onClose={this.onClose}
          />
        </div>
        <SearchByCategory
          show={this.state.activateSearch}
          handleClose={this.handleCloseActiveSearch}
        />
      </header>
    );
  }
}

export default Header;
