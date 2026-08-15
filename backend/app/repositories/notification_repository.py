from sqlalchemy.orm import Session

from app.models.notification import Notification


class NotificationRepository:

    def __init__(self, db: Session):
        self.db = db

    # =========================================================
    # CREATE
    # =========================================================

    def create(
        self,
        notification: Notification,
    ) -> Notification:

        self.db.add(notification)

        self.db.commit()

        self.db.refresh(notification)

        return notification

    # =========================================================
    # GET USER NOTIFICATIONS
    # =========================================================

    def get_by_user(
        self,
        user_id: int,
        unread_only: bool = False,
    ) -> list[Notification]:

        query = (
            self.db.query(Notification)
            .filter(
                Notification.user_id == user_id
            )
        )

        if unread_only:
            query = query.filter(
                Notification.is_read.is_(False)
            )

        return (
            query
            .order_by(
                Notification.created_at.desc()
            )
            .all()
        )

    # =========================================================
    # GET BY ID
    # =========================================================

    def get_by_id(
        self,
        notification_id: int,
    ) -> Notification | None:

        return (
            self.db.query(Notification)
            .filter(
                Notification.id == notification_id
            )
            .first()
        )

    # =========================================================
    # MARK AS READ
    # =========================================================

    def mark_as_read(
        self,
        notification: Notification,
    ) -> Notification:

        notification.is_read = True

        self.db.commit()

        self.db.refresh(notification)

        return notification

    # =========================================================
    # MARK ALL AS READ
    # =========================================================

    def mark_all_as_read(
        self,
        user_id: int,
    ) -> int:

        count = (
            self.db.query(Notification)
            .filter(
                Notification.user_id == user_id,
                Notification.is_read.is_(False),
            )
            .update(
                {
                    Notification.is_read: True,
                },
                synchronize_session=False,
            )
        )

        self.db.commit()

        return count

    # =========================================================
    # DELETE
    # =========================================================

    def delete(
        self,
        notification: Notification,
    ) -> None:

        self.db.delete(notification)

        self.db.commit()