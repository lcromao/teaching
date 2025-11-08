from __future__ import annotations

from abc import ABC, abstractmethod
from typing import List, Optional

from src.core.entities.comment import Comment
from src.core.entities.product import Product


class ProductRepository(ABC):
    """Port defining the contract for product persistence."""

    @abstractmethod
    def add(self, product: Product) -> Product:
        """Persist a product and return the stored instance."""

    @abstractmethod
    def list_all(self) -> List[Product]:
        """Return all stored products."""

    @abstractmethod
    def get_by_id(self, product_id: int) -> Optional[Product]:
        """Return a product by identifier, if present."""

    @abstractmethod
    def get_by_name(self, name: str) -> Optional[Product]:
        """Return a product by unique name, if present."""

    @abstractmethod
    def delete_by_name(self, name: str) -> bool:
        """Delete a product by name. Returns True if a row was removed."""

    @abstractmethod
    def add_comment(self, product_id: int, comment: Comment) -> Product:
        """Attach a comment to a product and return the updated product."""
