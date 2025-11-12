#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if virtual environment exists
check_venv() {
    if [ ! -d "venv" ]; then
        print_status "Creating virtual environment..."
        python3.12 -m venv venv
        print_success "Virtual environment created"
    fi
}

# Activate virtual environment
activate_venv() {
    print_status "Activating virtual environment..."
    source venv/bin/activate
    print_success "Virtual environment activated"
}

# Install dependencies
install_deps() {
    print_status "Installing dependencies..."
    pip install --upgrade pip
    pip install -r requirements.txt
    print_success "Dependencies installed"
}

# Run unit tests
run_unit_tests() {
    print_status "Running unit tests..."
    pytest tests/
    
    if [ $? -eq 0 ]; then
        print_success "Unit tests passed"
    else
        print_error "Unit tests failed"
        exit 1
    fi
}

# Run development server
run_dev() {
    print_status "Starting development server..."
    export PYTHONPATH="${PYTHONPATH}:$(pwd)/src"
    python -m src.app.main
}

# Clean up
clean() {
    print_status "Cleaning up..."
    rm -rf __pycache__
    rm -rf .pytest_cache
    rm -rf htmlcov
    rm -rf .coverage
    rm -rf .mypy_cache
    find . -name "*.pyc" -delete
    find . -name "__pycache__" -type d -exec rm -rf {} +
    print_success "Cleanup completed"
}

# Show help
show_help() {
    echo "Todo Service Development Scripts"
    echo ""
    echo "Usage: ./scripts.sh [command]"
    echo ""
    echo "Commands:"
    echo "  setup              Setup development environment"
    echo "  test-unit          Run unit tests only"
    echo "  dev                Run development server"
    echo "  clean              Clean up temporary files"
    echo "  help               Show this help"
}

case $1 in
    setup)
        check_venv
        activate_venv
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
    clean)
        clean
        ;;
    help|*)
        show_help
        ;;
esac