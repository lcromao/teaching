#!/bin/bash

# Logging helpers
print_status() {
    echo -e "[INFO] $1"
}

print_success() {
    echo -e "[SUCCESS] $1"
}

print_warning() {
    echo -e "[WARNING] $1"
}

print_error() {
    echo -e "[ERROR] $1"
}

# Virtualenv helpers
check_venv() {
    if [ ! -d "venv" ]; then
        print_status "Creating virtual environment..."
        python3 -m venv venv
        print_success "Virtual environment created"
    else
        print_warning "Virtual environment already exists"
    fi
}

activate_venv() {
    if [ ! -d "venv" ]; then
        print_error "Virtual environment not found. Run './scripts.sh setup' first."
        exit 1
    fi
    print_status "Activating virtual environment..."
    # shellcheck disable=SC1091
    source venv/bin/activate
    print_success "Virtual environment activated"
}

activate_venv_windows() {
    if [ ! -d "venv" ]; then
        print_error "Virtual environment not found. Run './scripts.sh setup' first."
        exit 1
    fi
    print_status "Activating virtual environment..."
    # shellcheck disable=SC1091
    source venv/Scripts/activate
    print_success "Virtual environment activated"
}

install_deps() {
    print_status "Installing dependencies..."
    pip install --upgrade pip
    pip install -r requirements.txt
    print_success "Dependencies installed"
}

run_unit_tests() {
    print_status "Running unit tests..."
    if pytest tests/; then
        print_success "Unit tests passed"
    else
        print_error "Unit tests failed"
        exit 1
    fi
}

run_dev() {
    print_status "Starting FastAPI development server..."
    uvicorn main:app --reload
}

clean() {
    print_status "Cleaning up..."
    rm -rf __pycache__
    rm -rf .pytest_cache
    rm -rf .mypy_cache
    rm -rf .coverage
    find . -name "*.pyc" -delete
    find . -name "__pycache__" -type d -exec rm -rf {} +
    print_success "Cleanup completed"
}

show_help() {
    echo "Todo List API scripts"
    echo ""
    echo "Usage: ./scripts.sh [command]"
    echo ""
    echo "Commands:"
    echo "  setup       Create virtualenv and install dependencies"
    echo "  test-unit   Run pytest suite"
    echo "  dev         Run uvicorn with reload"
    echo "  clean       Remove temporary files"
    echo "  help        Show this message"
}

case $1 in
    setup)
        check_venv
        activate_venv
        install_deps
        ;;
    setup-windows)
        check_venv
        activate_venv_windows
        install_deps
        ;;  
    test-unit)
        activate_venv
        run_unit_tests
        ;;
    dev)
        activate_venv
        run_dev
        ;;
    dev-windows)
        activate_venv_windows
        run_dev
        ;;
    clean)
        clean
        ;;
    help|*)
        show_help
        ;;
esac
