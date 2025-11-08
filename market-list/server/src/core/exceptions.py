class CoreError(Exception):
    """Base class for domain-level exceptions."""


class ProductAlreadyExists(CoreError):
    """Raised when attempting to create a duplicate product."""


class ProductNotFound(CoreError):
    """Raised when a product lookup fails."""


class CommentCreationError(CoreError):
    """Raised when a comment cannot be created for a product."""
